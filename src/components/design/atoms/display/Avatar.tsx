import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Initials } from "./Initials";

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const ImgWrap = styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background: var(--tooltip);
`;

const SetIcon = styled.img`
    display: flex;
    margin: auto;
    width: 20px;
    height: 20px;
`;

const FallbackBase = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 0.75rem;
    color: var(--foreground);
    background: var(--tooltip);
`;

const ParentBase = styled.svg<Pick<Props, "interactive">>`
    user-select: none;
    box-shadow: 4px 4px 6px #0e0d0d;
    border-radius: 50%;

    foreignObject {
        transition: 150ms ease filter;
    }

    ${(props) =>
        props.interactive &&
        css`
            cursor: pointer;

            &:hover foreignObject {
                filter: brightness(0.8);
            }
        `}
`;

export type Props = {
    /**
     * Avatar size
     */
    size?: number;

    /**
     * Image source
     */
    src?: string;

    /**
     * Fallback if no source
     */
    fallback?: string | ReactNode;

    /**
     * Punch a hole through the avatar
     */
    holepunch?: "bottom-right" | "top-right" | "right" | "none" | false;

    /**
     * Specify overlay component
     */
    overlay?: ReactNode;

    /**
     * Whether this icon is interactive
     */
    interactive?: boolean;
};

/**
 * Generic Avatar component
 *
 * Partially inspired by Adw.Avatar API, we allow users to specify a fallback component (usually just text) to display in case the URL is invalid.
 */
export function Avatar({
    size,
    holepunch,
    fallback,
    src,
    overlay,
    interactive,
}: Props) {
    return (
        <ParentBase
            width={size}
            height={size}
            viewBox="0 0 32 32"
            interactive={interactive}>
            <foreignObject
                x="0"
                y="0"
                width="32"
                height="32"
                mask={holepunch ? `url(#holepunch-${holepunch})` : undefined}>
                {src && <Image src={src} />}
                {!src && (
                    <FallbackBase>
                        {/* {typeof fallback === "string" ? (
                            <Initials input={fallback} maxLength={2} />
                        ) : (
                            fallback
                        )} */}
                    </FallbackBase>
                )}
            </foreignObject>
            {overlay}
        </ParentBase>
    );
}

export function OtherIcon({
    size,
    holepunch,
    fallback,
    src,
    overlay,
    interactive,
}: Props) {
    return (
        <ParentBase
            width={size}
            height={size}
            viewBox="0 0 32 32"
            interactive={interactive}>
            <foreignObject
                x="0"
                y="0"
                width="32"
                height="32"
                mask={holepunch ? `url(#holepunch-${holepunch})` : undefined}>
                {src && <ImgWrap>
                    <SetIcon src="/assets/icons/searchIcon.png" />
                </ImgWrap>}
                {!src && (
                    <FallbackBase>
                        {typeof fallback === "string" ? (
                            <Initials input={fallback} maxLength={2} />
                        ) : (
                            fallback
                        )}
                    </FallbackBase>
                )}
            </foreignObject>
            {overlay}
        </ParentBase>
    );
}