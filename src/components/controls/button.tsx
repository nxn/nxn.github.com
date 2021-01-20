import React    from "react";
import styled   from "@emotion/styled";
import clsx     from "clsx";
import Link     from "./link";

// Wrapper Components for HTML elements that can serve as buttons; doing this allows them to be used as inputs to HOCs.
// Though doing it this way is a bit silly -- might be a better idea to use a render prop instead.
const HTMLButton = (p: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => <button { ... p } />;

type ButtonProps = {
    color?:     "primary" | "secondary",
    variant?:   "standard" | "minimal",
    outlined?:  boolean,
    className?: string,
    startIcon?: React.ReactNode,
    endIcon?:   React.ReactNode,
    children?:  React.ReactNode
}

function asButton<P>(Component: React.ComponentType<P>) {
    return (props: ButtonProps & P) => {
        const { className, color, variant, outlined, startIcon, endIcon, children, ...remaining } = props;

        return (
            <Component 
                className={ clsx(
                    className, 
                    "button", 
                    color       || "primary", 
                    variant     || "standard", 
                    outlined    && "outlined"
                ) } 
                { ...remaining as P }>
                
                { startIcon && <span className="button-icon-start">{ startIcon }</span> }
                { children }
                { endIcon && <span className="button-icon-end">{ endIcon }</span> }
            </Component>
        );
    }
}

export const Button     = styled(asButton(HTMLButton))(({theme}) => theme.styles.controls.button);
export const LinkButton = styled(asButton(Link))(({theme}) => theme.styles.controls.button);
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
    
    width: fullWidth ? '100%' : 'auto',
    '& > .button': {
        flex: fullWidth ? '1 1 0px' : '0 1 auto'
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
