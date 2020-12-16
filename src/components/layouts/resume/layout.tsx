import React from "react";
import styled from "@emotion/styled";

import theme from "../../theme";
import { withGlobal } from "../../util";

import '../../../styles/reset.css';
import '../../../styles/fonts.css';

import chevron from '../../../images/chevron.svg';

type LayoutProps = {
    children?: React.ReactNode;
    className?: string
}

export function LayoutUnstyled(props: LayoutProps) {
    return (
        <div id="page" className={ props.className }>
            { props.children }
        </div>
    );
}

const globalStyles = {
    body: {
        color:              theme.resume.palette.page.text,
        backgroundColor:    theme.resume.palette.page.background,
        fontFamily:         '"Open Sans", sans-serif',
        fontSize:           '1rem',
        lineHeight:         '1.5rem',
        padding:            '6.5%',

        '@media print': {
            color:              theme.resume.palette.black,
            fontSize:           '11pt',
            backgroundColor:    theme.resume.palette.white,
            padding:            '0 0 0 1rem'
        },

        '@media screen and (min-width: 48rem)': {
            padding: '3.125rem'
        }
    },

    'h1, h2, h3, h4, h5, h6, strong':   { color:        theme.resume.palette.header.text },
    'h1, h3':                           { fontFamily:   '"Oswald", sans-serif' },
    'h2, h4, h5, h6, strong':           { fontFamily:   '"Roboto Slab", serif' },
    'h5, strong':                       { fontWeight:   700 },

    h1: { 
        fontSize:   '3rem',
        lineHeight: '1.0em'
    },
    h2: {
        fontSize:   '2rem',
        margin:     '2rem 0 2rem 0',
        display:    'block'
    },
    h3: {
        fontSize:   '1.5rem',
        lineHeight: '1.5em',
        marginTop:  '1.5rem'
    },
    h4: {
        fontWeight: 700
    },
    h5: {
        marginBottom: '0.5rem'
    },
    h6: {
        fontSize:   '1.25rem',
        lineHeight: '2rem'
    },

    p: {
        marginBottom: '1.0rem'
    },

    em: { fontWeight: 400 },

    ul: {
        listStyleType:  'disc',
        listStyleImage: `url("${ chevron }")`
    },
    li: {
        paddingBottom:  '0.5rem',
        breakInside:    'avoid' as 'avoid'
    },

    hr: {
        margin:             '0.5rem 0',
        borderStyle:        'solid',
        borderBottomWidth:  '0.25rem',
        borderTop:          0,
        borderLeft:         0,
        borderRight:        0,
        borderImage: 
            `linear-gradient(to right, ${ theme.resume.palette.accent.subtle }, rgba(247, 247, 247, 0)) 100% 1;`
    },
}

export const Layout = styled(withGlobal(LayoutUnstyled, globalStyles))(({theme: { resume: theme }}) => ({
    maxWidth:   '64rem',
    minWidth:   '17.5rem', /* ~280px with 20px of padding on each side */
    margin:     '0 auto',

    '& #tech-tags ul': {
        display:    'flex',
        flexFlow:   'row wrap',

        '& li': {
            lineHeight:         '1.75em',
            color:              theme.palette.page.text,
            border:             `0.0625rem solid ${ theme.palette.accent.subtle }`,
            backgroundColor:    theme.palette.item.background,
            padding:            '0 0.6rem',
            marginBottom:       '0.4rem',
            marginRight:        '0.4rem',
            borderRadius:       '0.2rem',
            listStyle:          'none'
        }
    },

    '& header h6': {
        marginBottom: '1rem'
    },

    '& #summary': {
        '& p': {
            marginTop: '1rem'
        },
        '& h3': {
            marginBottom: '0.5rem'
        }
    },

    '& footer': {
        color:      theme.palette.gray,
        fontSize:   '0.9rem',
        paddingTop: '1rem'
    },

    '@media screen and (min-width: 48rem)': {
        '& section ul': {
            columns:    2,
            columnGap: '3rem'
        },
        '& #summary': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '3rem',
            gridTemplateAreas: `
                "paragraph   paragraph"
                "specialties tech-tags"
            `,
            '& p': {
                gridArea: 'paragraph'
            },
            '& h3': {
                marginTop: '0.5rem'
            },
            '& #specialties': {
                gridArea: 'specialties'
            },
            '& tech-tags': {
                gridArea: 'tech-tags'
            }
        }
    },

    '@media print': {
        '& footer': {
            display: 'none'
        }
    }
}));

export default Layout;

