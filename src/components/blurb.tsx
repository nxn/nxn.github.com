import React from "react";
import styled from "@emotion/styled";

type BlurbProps = {
    className?:     string,
    title:          string,
    date:           string,
    children?:      React.ReactNode
};

export function BlurbUnstyled(props: BlurbProps) {
    return (
        <article className={ props.className }>
            <header>
                <h2>{ props.title }</h2>
            </header>
            <div className="description">
                { props.children }
            </div>
        </article>
    );
}

export const Blurb = styled(BlurbUnstyled)(({theme: { main: theme }}) => ({
    border:             `0.0625rem solid ${ theme.palette.box.border }`,
    backgroundColor:    theme.palette.box.background,
    '&:nth-child(odd)': {
        backgroundColor: theme.palette.box.backgroundAlt
    },

    '& header': {
        minHeight:  '12rem',
        position:   'relative',
        overflow:   'hidden',

        '& h2': {
            fontFamily:         '"Oswald", sans-serif',
            fontSize:           '1.2rem',
            color:              theme.palette.accent.standard,
            padding:            '0.5rem 1rem',
            width:              'calc(100% - 2rem)',
            position:           'absolute',
            top:                0,
            left:               0,
            backgroundColor:    theme.palette.box.backgroundAlt,
            opacity:            '0.9',
            whiteSpace:         'nowrap',
            overflow:           'hidden',
            textOverflow:       'ellipsis'
        }
    },

    '& .description': {
        color: theme.palette.box.text,
        margin: '1rem'
    },
}));

export default Blurb;