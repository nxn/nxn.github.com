import React, { SVGAttributes } from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

export type SvgProps = SVGAttributes<SVGSVGElement> & {
    title?:     string,
    color?:     "primary" | "secondary" | "disabled",
    htmlColor?: string
}

export function SvgUnstyled(props: SvgProps) {
    let { title, children, viewBox, className, color, htmlColor, ...remaining } = props;

    viewBox = viewBox ? viewBox : '0 0 24 24';

    return (
        <svg
            className   = { clsx(className, color) }
            color       = { htmlColor }
            viewBox     = { viewBox }
            focusable   = "false"
            aria-hidden = { title ? undefined : true }
            role        = { title ? 'img' : undefined }
            { ...remaining }>
            
            { title && <title>{ title }</title> }
            { children }
        </svg>
    )
}

export const Svg = styled(SvgUnstyled)(({theme}) => ({
    display:        'inline-block',
    fill:           'currentcolor',
    userSelect:     'none',
    width:          '1rem',
    height:         '1rem',
    flexShrink:     0,
    '&.primary':    { color: theme.palette.actions.primary.main },
    '&.secondary':  { color: theme.palette.actions.secondary.main },
    '&.disabled':   { color: theme.palette.actions.disabled.main }
}));

export default Svg;