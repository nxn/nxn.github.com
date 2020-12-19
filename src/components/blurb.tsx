import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

type BlurbProps = {
    className?:     string,
    title:          string,
    date:           string,
    style?:         string,
    children?:      React.ReactNode
};

export function BlurbUnstyled(props: BlurbProps) {
    return (
        <article className={ clsx(props.className, props.style) }>
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

export const BlurbContainer = styled.div({
    display:                'grid',
    gridTemplateColumns:    '1fr',
    gridAutoFlow:           'dense',
    gap:                    '1rem',

    '@media (min-width: 41.5rem)': {
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',

        '& .full-row':      { gridColumn: '1 / -1' },
        '& .middle':        { gridColumn: '2 / -2' },
        '& .right-large':   { gridColumn: '2 / -1' },
        '& .left-large':    { gridColumn: '1 / -2' },
        '& .right-small':   { gridColumn: '-3 / -1' },
        '& .left-small':    { gridColumn: '1 / 3' }
    },
})

export default Blurb;