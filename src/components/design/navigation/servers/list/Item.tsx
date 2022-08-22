import { observer } from "mobx-react-lite";
import React from "react";
import styled, { css } from "styled-components";
import type { Server } from "revolt.js";
import { DraggableProps } from "../../../../common";

import { Avatar } from "../../../atoms";
import { Unreads } from "../../../atoms/indicators/Unreads";
import { Swoosh } from "./Swoosh";
import { useLink, useTrigger } from "../../../../../lib/context";
import { Tooltip } from "../../../atoms/indicators/Tooltip";
import { INotificationChecker } from "revolt.js/dist/util/Unreads";

export const ItemContainer = styled.div<{ head?: boolean }>`
    // width: 56px;
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 6px;

    display: flex;
    justify-content: center;
    cursor: pointer;

    ${(props) =>
        props.head &&
        css`
            color: white;
            font-size: 13px;
            padding: 10px 7px;
        `}
    
    .title {
        text-shadow: 3px 5px 2px #0e0d0d;
        font-weight: bold;
    }
`;

const SwooshWrapper = styled.div`
    position: absolute;
    background: rgb(255 255 255 / 30%);
    width: 80px;
    height: 60px;
    left: -15px;
    margin-top: -5px;
    border-left: 6px solid rgb(255 255 255 / 50%);

    // position: absolute;
    // background: red;
    // width: 80px;
    // height: 30px;
    // left: -7px;
    // top: -32px;

    z-index: -1;
`;

export function SwooshOverlay() {
    return (
        <div style={{ position: "relative" }}>
            <SwooshWrapper>
                <Swoosh />
            </SwooshWrapper>
        </div>
    );
}

const Inner = observer(({ item, permit }: InnerProps) => {
    const Link = useLink();
    const Trigger = useTrigger();
    const unread = !!item.isUnread(permit);
    const count = item.getMentions(permit).length;

    return (
        <Tooltip content={item.name} div right>
            <Trigger id="Menu" data={{ server: item._id, unread }}>
                <Link to={"/server/" + item._id}>
                    <Avatar
                        size={50}
                        interactive
                        fallback={item.name}
                        holepunch={(unread || count > 0) && "top-right"}
                        overlay={<Unreads unread={unread} count={count} />}
                        src={item.generateIconURL({ max_side: 256 }, false)}
                    />
                </Link>
            </Trigger>
        </Tooltip>
    );
});

export type InnerProps = {
    item: Server;
    permit: INotificationChecker;
};

type Props = DraggableProps<Server> &
    InnerProps & {
        active: boolean;
    };

export function Item({ provided, isDragging, active, ...innerProps }: Props) {
    return (
        <ItemContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style}>
            {active && <SwooshOverlay />}
            <Inner {...innerProps} />
        </ItemContainer>
    );
}
