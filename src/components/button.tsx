import React from "react";
import styled from "@emotion/styled";

type ButtonProps = {
    children: React.ReactNode,
    className?: string
}

export function ButtonUnstyled(props: ButtonProps) {
    return (
        <button className={ props.className } >
            { props.children }
        </button>
    );
}

export const LinkButton = styled('a')({
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '2.5rem',
    display: 'inline-block',
    padding: '0rem 1.5rem',
    borderRadius: '2.5rem',

    '&.primary': {
        color: '#D7D0C7',
        backgroundColor: '#28192b',
        '&:hover': {
            color: '#F0E5DF',
            backgroundColor: '#312437'
        }
    },

    '&.secondary': {
        color: '#94B1A3',
        backgroundColor: '#05070b'
    }
});

type ButtonGroupProps = {
    className?: string,
    children?: React.ReactNode
}

export function ButtonGroupUnstyled(props: ButtonGroupProps) {
    return (
        <div className={ props.className }>
            { props.children }
        </div>
    )
}

export const ButtonGroup = styled(ButtonGroupUnstyled)({
    '& > .primary, & > .secondary': {
        borderRadius: 0,
        marginRight: '0.0625rem'
    },
    '& :first-of-type': {
        borderTopLeftRadius: '2.5rem',
        borderBottomLeftRadius: '2.5rem'
    },
    '& :last-child': {
        borderTopRightRadius: '2.5rem',
        borderBottomRightRadius: '2.5rem'
    }
});

export default LinkButton;