import React                        from "react";
import styled                       from "@emotion/styled";
import Helmet                       from "react-helmet";
import { useStaticQuery, graphql }  from "gatsby";
import { ThemeProvider, Global }    from "@emotion/react";
import { MDXProvider }              from '@mdx-js/react';
import clsx                         from "clsx";

import theme        from "../../themes/main/theme";
import components   from "../common";

import Header       from "./header";
import Main         from "./main";
import Footer       from "./footer";
import Snackbar     from "../snackbar";
import ImageViewer  from "../imageviewer";

import '../../stylesheets/reset.css';
import '../../stylesheets/fonts.css';

import OpenSansRegularFont      from '../../fonts/OpenSans/OpenSans-Regular.woff2';
import OpenSansBoldFont         from '../../fonts/OpenSans/OpenSans-Bold.woff2';
import OswaldRegularFont        from '../../fonts/Oswald/Oswald-Regular.woff2';
import RobotoSlabRegularFont    from '../../fonts/RobotoSlab/RobotoSlab-Regular.woff2';


export enum Variant {
    Standard    = 0,
    Minimal     = 1 << 0,
    Unpadded    = 1 << 1
}

type LayoutProps = {
    variant?:   Variant,
    children?:  React.ReactNode;
    className?: string
}

export function Layout(props: LayoutProps) {
    const variant = props.variant || 0;
    const unpadded = !!(variant & Variant.Unpadded);
    const { site: { siteMetadata: meta } } = useStaticQuery(graphql`query {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }`);

    return (
        <ThemeProvider theme={ theme }>
            <Global styles={ globalStyles } />
            <Helmet>
                <title>
                    Ernie Wieczorek: Personal Portfolio · { meta.title }
                </title>
                <meta name="description" content={ meta.description } />
                <meta name="author" content={ meta.author } />

                <link rel="preload" href={ OpenSansRegularFont } as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ OswaldRegularFont } as="font"  type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ RobotoSlabRegularFont } as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href={ OpenSansBoldFont } as="font" type="font/woff2" crossOrigin="" />
            </Helmet>

            <MDXProvider components={ components }>
                <Container id="layout" className={ clsx(props.className, props.variant) }>
                    <Header />
                    <Main unpadded={ unpadded }>
                        { props.children }
                    </Main>
                    <Footer />
                </Container>
                <ModalRoot id="modal-root">
                    <ImageViewer />
                    <Snackbar />
                </ModalRoot>
            </MDXProvider>
        </ThemeProvider>
    );
}

const globalStyles = {
    ':root': {
        // Equates to a minimum margin of 2rem plus an addition 7.5% of the available space left after meeting the
        // breakpoint. That's per side, so the right + left margin total would be 15% * (100vw - breakpoint) + 4rem.

        //`calc(7.5vw - ${ theme.breakPoints.standard * 0.075 - 2 }rem)`,
        '--content-h-margin': `calc(${ 
            (theme.spacing.margins.standard.additional      || 0.075) * 100 // 7.5vw
        }vw - ${ theme.breakPoints.standard                                 // - (40
            * (theme.spacing.margins.standard.additional    || 0.075)       // * 0.075
            - (theme.spacing.margins.standard.minHorizontal || 2)           // - 2)rem
        }rem)`,
        
        // Same as above, but caps the maxium vertical margin to 4rem max
        '--content-v-margin': `min(${ theme.spacing.margins.standard.maxVertical }rem, var(--content-h-margin))`
    },
    body: theme.styles.body,

    '.no-scroll':   { overflow: 'hidden !important' },
    '.no-display':  { display: 'none !important' }
}

const ModalRoot = styled.div({ })

const Container = styled.div({
    minWidth:           '20rem',
    margin:             '0 auto',
    position:           'relative',
    paddingTop:         '4rem'
});

export default Layout;