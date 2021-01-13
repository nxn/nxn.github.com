import React                        from "react";
import styled                       from "@emotion/styled";
import { ThemeProvider, Global }    from "@emotion/react";
import { MDXProvider }              from '@mdx-js/react';

import theme    from "../../themes/resume/theme";
import common   from "../common";
import Menu     from "./menu";

import '../../stylesheets/reset.css';
import '../../stylesheets/fonts.css';

type LayoutProps = {
    children?: React.ReactNode;
    className?: string
}

const components = { Menu, ...common };

export function Layout(props: LayoutProps) {
    return (
        <ThemeProvider theme={ theme }>
            <Global styles={{ body: theme.styles.body }} />
            <MDXProvider components={ components }>
                <Container>{ props.children }</Container>
            </MDXProvider>
        </ThemeProvider>
    );
}

const Container = styled.div(({theme}) => ({
    maxWidth:   '64rem',
    minWidth:   '17.5rem', /* ~280px with 20px of padding on each side */
    margin:     '0 auto',

    '& #tech-tags li': {
        color:              theme.palette.accents.dim,
        display:            'inline-block',
        border:             `0.0625rem solid ${ theme.palette.accents.light }`,
        backgroundColor:    theme.palette.accents.white,
        padding:            '0.15rem 0.5rem',
        marginBottom:       '0.4rem',
        marginRight:        '0.4rem',
        borderRadius:       '0.25rem',
        listStyle:          'none'
    },

    '& #overview': {
        '& p': {
            marginTop: '1rem'
        },
        '& h3': {
            marginBottom: '0.5rem'
        }
    },

    '& footer': {
        color:      theme.palette.accents.gray,
        fontSize:   '0.9rem',
        paddingTop: '1rem',
        '& p': {
            marginBottom: 0
        }
    },

    // Set lists and summary to 2 Columns when printing or on larger screens
    '@media print, (min-width: 48rem)': {
        '& section ul': {
            columns:    2,
            columnGap: '2rem'
        },
        '& #overview': {
            display:                'grid',
            gridTemplateColumns:    '1fr 1fr',
            columnGap:              '2rem',
            gridTemplateAreas: `
                "summary        summary"
                "specialties    tech-tags"
            `,
            '& #summary':       { gridArea: 'summary' },
            '& #specialties':   { gridArea: 'specialties' },
            '& #tech-tags':     { gridArea: 'tech-tags' },
            '& h3':             { marginTop: '0.5rem' },
        }
    },


    '@media print': {
        maxWidth: 'none',
        // Moves links to top right when printing
        '& header': {
            display: 'grid',
            gridTemplateColumns:    '1fr auto',
            gridTemplateRows:       'auto 1fr',
            gridTemplateAreas: `
                "name   links"
                "title  links"
            `,
            '& h1': {
                gridArea: "name",
            },
            '& h6': {
                gridArea: "title",
                marginBottom: 0
            },
            '& ul': {
                gridArea: "links"
            },
            '& hr': {
                display: 'none'
            }
        },
        '& footer': {
            display: 'none'
        }
    }
}));

export default Layout;

