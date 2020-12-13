import React from "react";
import { Theme, Interpolation } from "@emotion/react";
import styled from "@emotion/styled";
import clsx from "clsx";

import { palette } from "./theme";

// Wrapper Components for HTML elements that can serve as buttons; doing this allows them to be used as inputs to HOCs.
// Though doing it this way is a bit silly -- might be a better idea to use a render prop instead.
const HTMLButton = (p: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => <button { ... p } />;
const HTMLAnchor = (p: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => <a { ...p } />;

type ButtonProps = {
    color?: "primary" | "secondary",
    className?: string,
}

function asButton<P>(Component: React.ComponentType<P>) {
    return (props: ButtonProps & P) => {
        const { className, color, ...remaining } = props;
        return <Component className={ clsx(className, "button", color || "primary") } { ...remaining as P } />
    }
}

const buttonStyle: Interpolation<Theme> = {
    fontFamily:     '"Open Sans", sans-serif',
    fontSize:       '0.8rem',
    fontWeight:     'bold',
    textTransform:  'uppercase',
    textAlign:      'center !important' as 'center',
    lineHeight:     '2.5rem',
    display:        'inline-block',
    padding:        '0rem 1.5rem',
    border:         0,
    borderRadius:   '2.5rem',
    boxSizing:      'border-box',
    cursor:         'pointer',

    '&.primary': {
        color:                  palette.button.primary.text,
        backgroundColor:        palette.button.primary.background,
        '&:hover': {
            color:              palette.button.primary.hover.text,
            backgroundColor:    palette.button.primary.hover.background
        }
    },

    '&.secondary': {
        color:                  palette.button.secondary.text,
        backgroundColor:        palette.button.secondary.background,
        '&:hover': {
            color:              palette.button.secondary.hover.text,
            backgroundColor:    palette.button.secondary.hover.background
        }
    }
}

export const Button     = styled(asButton(HTMLButton))(buttonStyle);
export const LinkButton = styled(asButton(HTMLAnchor))(buttonStyle);
export default Button;

type ButtonGroupProps = {
    className?: string,
    children?: React.ReactNode
}

export function ButtonGroupUnstyled(props: ButtonGroupProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return <div { ...props } />;
}

export const ButtonGroup = styled(ButtonGroupUnstyled)({
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
});
