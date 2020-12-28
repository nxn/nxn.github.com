import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "@emotion/styled";
import clsx from "clsx";

// Wrapper Components for HTML elements that can serve as buttons; doing this allows them to be used as inputs to HOCs.
// Though doing it this way is a bit silly -- might be a better idea to use a render prop instead.
const HTMLButton = (p: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => <button { ... p } />;
const HTMLAnchor = (p: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => <a { ...p } />;

type ButtonProps = {
    color?: "primary" | "secondary",
    variant?: "standard" | "minimal",
    className?: string,
}

function asButton<P>(Component: React.ComponentType<P>) {
    return (props: ButtonProps & P) => {
        const { className, color, variant, ...remaining } = props;
        return <Component className={ clsx(className, "button", color || "primary", variant || "standard") } { ...remaining as P } />
    }
}

export const Button             = styled(asButton(HTMLButton))(({theme}) => theme.styles.controls.button);
export const LinkButton         = styled(asButton(HTMLAnchor))(({theme}) => theme.styles.controls.button);
export const GatsbyLinkButton   = styled(asButton(GatsbyLink))(({theme}) => theme.styles.controls.button);
export default Button;

type ButtonGroupProps = {
    className?: string,
    fullWidth?: boolean,
    children?: React.ReactNode
}

export function ButtonGroupUnstyled(props: ButtonGroupProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { fullWidth, ...remaining } = props;
    return <div { ...remaining } />;
}

export const ButtonGroup = styled(ButtonGroupUnstyled)(({ fullWidth }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    '& > .button': {
        flex: fullWidth ? '1 0 0rem' : '0 1 auto'
    },
    
    // Hacks because emotion css doesn't allow 'first-child' selectors
    '& > .button + .button': {
        borderTopLeftRadius:        0,
        borderBottomLeftRadius:     0
    },
    '& > .button:not(:last-child)': {
        marginRight:                '0.0625rem',
        borderTopRightRadius:       0,
        borderBottomRightRadius:    0
    },
}));
