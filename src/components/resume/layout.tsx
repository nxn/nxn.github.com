import React                        from "react";
import styled                       from "@emotion/styled";
import Helmet                       from "react-helmet";
import { ThemeProvider, Global }    from "@emotion/react";
import { MDXProvider }              from '@mdx-js/react';

import theme    from "../../themes/resume/theme";
import common   from "../common";
import List     from "./list";
import FileLink from "./filelink";

import { gridTemplate } from "../../util";

import '../../stylesheets/reset.css';
import '../../stylesheets/fonts.css';

import OpenSansRegularFont      from '../../fonts/OpenSans/OpenSans-Regular.woff2';
import OswaldRegularFont        from '../../fonts/Oswald/Oswald-Regular.woff2';
import RobotoSlabRegularFont    from '../../fonts/RobotoSlab/RobotoSlab-Regular.woff2';
import RobotoSlabBoldFont       from '../../fonts/RobotoSlab/RobotoSlab-Bold.woff2';

type LayoutProps = {
    children?: React.ReactNode;
    className?: string
}

const components = { List, FileLink, ...common };

export function Layout(props: LayoutProps) {
    return (
        <ThemeProvider theme={ theme }>
            <Helmet>
                <html lang="en" />
                <link rel="preload" href={ OpenSansRegularFont } as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ OswaldRegularFont } as="font"  type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ RobotoSlabRegularFont } as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ RobotoSlabBoldFont } as="font" type="font/woff2" crossOrigin="" />
            </Helmet>
            <Global styles={{ body: theme.styles.body }} />
            <MDXProvider components={ components }>
                <Container>{ props.children }</Container>
            </MDXProvider>
        </ThemeProvider>
    );
}

const Container = styled.div(({theme}) => {
    const defaultMargins = {
        horizontal: theme.spacing.margins.horizontal    || 'max(1rem, 6.5%)',
        vertical:   theme.spacing.margins.vertical      || 'max(1rem, 6.5%)',
    }

    const printMargins = {
        horizontal: '0.5in',
        vertical:   '0.5in',
        ...theme.spacing.margins.print
    }

    const standardMargins = {
        horizontal: 'auto',
        vertical: '0.25in',
        ...theme.spacing.margins.standard
    }

    return {
        '& header': {
            display:                'grid',
            rowGap:                 '1rem',
            columnGap:              '2rem',
            gridTemplateColumns:    'auto 1fr',
            gridTemplateAreas:  gridTemplate(
                'title      title',
                'download   contact',
                'summary    summary',
                'spec-list  spec-list',
                'tech-tags  tech-tags'
            ),
            '& #title':         { gridArea: 'title', },
            '& #summary':       { gridArea: 'summary' },
            '& #spec-list':     { gridArea: 'spec-list' },
            '& #tech-tags':     { gridArea: 'tech-tags' },
            '& #contact':       { gridArea: 'contact' },
            '& #download': { 
                gridArea:   'download',
                alignSelf:  'center',
                justifySelf: 'self-start'
            },
        },

        '& #summary p': { marginBottom: 0 },

        '& #tech-tags li': {
            display:            'inline-block',
            border:             `0.0625rem solid ${ theme.palette.accents.light }`,
            padding:            '0.15rem 0.5rem',
            marginTop:          '0.5rem',
            marginRight:        '0.5rem',
            borderRadius:       '0.25rem',
            boxSizing:          'border-box',
            listStyle:          'none',
            '&::before':        { content: 'none' },
        },

        ['@media screen']: {
            minWidth:           '17.5rem', /* ~280px with 20px of padding on each side */
            backgroundColor:    theme.palette.bgs.standard.main,
            padding:            `${ defaultMargins.vertical } ${ defaultMargins.horizontal }`,

            // Should be the same as the height of a <br /> (1.5rem lineHeight)
            '& .page':          { marginBottom: '1.5rem' },
            '& #tech-tags li':  { color: theme.palette.text.standard.light }
        },

        // Creates distinct page styles when view is large enough (should not be applied when printing)
        [`@media screen and (min-width: ${ theme.breakPoints.standard }in)`]: {
            padding: 0,
            backgroundColor: theme.palette.bgs.standard.dim,

            '& .page': {
                maxWidth:           '8.5in',
                minHeight:          '11in',
                boxSizing:          'border-box',
                backgroundColor:    theme.palette.bgs.standard.main,
                borderRadius:       '0.25rem',
                boxShadow:          '0rem 0.125rem 0.125rem rgba(0,0,0,0.25), 0rem 0.25rem 0.5rem rgba(0,0,0,0.08)',
                margin:             `${ standardMargins.vertical } ${ standardMargins.horizontal }`,
                padding:            `${ printMargins.vertical } ${ printMargins.horizontal }`,
            },
        },

        // Splits select resume content into columns when the view is large enough or when printing
        [`@media print, (min-width: ${ theme.breakPoints.standard }in)`]: {
            '& header': {
                gridTemplateColumns:    'calc(50% - 1rem) 1fr 1fr',
                columnGap:              '2rem',
                gridTemplateAreas: gridTemplate(
                    'title      download    contact',
                    'summary    summary     summary',
                    'spec-list  tech-tags   tech-tags'
                ),
                '& #download': {
                    justifySelf: 'self-end'
                },
                '& ul': { columns: 1 }
            },

            '& ul': {
                columns:    2,
                columnGap: '2rem'
            },
        },

        // Print specific styles
        ['@media print']: { '& #download':              { display: 'none' } },
        ['@media print and (orientation: portrait)']:   { '& .page': { pageBreakInside: 'avoid' } },
        ['@page']: { 
            size: 'letter portrait',
            margin: `${ printMargins.vertical } ${ printMargins.horizontal }`
        }
    }
});

export default Layout;

