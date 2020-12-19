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

export const Blurb = styled(BlurbUnstyled)(({theme}) => ({
    border:             `0.0625rem solid ${ theme.palette.bgs.standard.light }`,
    color:              theme.palette.text.standard.light,
    backgroundColor:    theme.palette.bgs.standard.main,
    '&:nth-of-type(even)': {
        color:              theme.palette.text.standard.main,
        backgroundColor:    theme.palette.bgs.standard.dark
    },

    '& header': {
        minHeight:  '12rem',
        position:   'relative',
        overflow:   'hidden',

        '& h2': {
            fontFamily:         '"Oswald", sans-serif',
            fontSize:           '1.2rem',
            color:              theme.palette.accents.blue,
            padding:            '0.5rem 1rem',
            width:              'calc(100% - 2rem)',
            position:           'absolute',
            top:                0,
            left:               0,
            backgroundColor:    theme.palette.bgs.standard.dark,
            opacity:            '0.9',
            whiteSpace:         'nowrap',
            overflow:           'hidden',
            textOverflow:       'ellipsis'
        }
    },

    '& .description': {
        margin: '1rem'
    },
}));

export default Blurb;