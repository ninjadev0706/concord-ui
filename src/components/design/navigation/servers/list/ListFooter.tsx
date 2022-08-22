import { Plus } from "@styled-icons/boxicons-regular";
import styled, { css } from "styled-components";
import { Compass } from "@styled-icons/boxicons-solid";
import React from "react";

import { useLink } from "../../../../../lib";

import { Avatar } from "../../../atoms";
import { Tooltip } from "../../../atoms/indicators/Tooltip";
import { ItemContainer } from "./Item";

export interface FooterProps {
    createServer: () => void;
    showDiscover?: boolean;
}

const SetIcon = styled.img`
    display: flex;
    margin: auto;
    width: 18px;
    height: 18px;
`;

/**
 * Buttons at the bottom of the list, including "create new server" and "discovery".
 */
export function ListFooter({ createServer, showDiscover }: FooterProps) {
    const Link = useLink();

    return (
        <>
            <a onClick={createServer}>
                <ItemContainer>
                    <Tooltip content="Add a server" div right>
                        <Avatar
                            size={50}
                            fallback={<SetIcon src="/assets_default/icons/addIcon.png" />}
                            interactive
                        />
                    </Tooltip>
                </ItemContainer>
            </a>
            {showDiscover && (
                <Link to="/discover">
                    <ItemContainer>
                        <Tooltip content="Discover Revolt" div right>
                            <Avatar
                                size={52}
                                fallback={
                                    <Compass color="var(--accent)" size={24} />
                                }
                                interactive
                            />
                        </Tooltip>
                    </ItemContainer>
                </Link>
            )}
        </>
    );
}
