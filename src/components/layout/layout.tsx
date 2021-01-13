import React                        from "react";
import styled                       from "@emotion/styled";
import Helmet                       from "react-helmet";
import { useStaticQuery, graphql }  from "gatsby";
import { ThemeProvider, Global }    from "@emotion/react";
import { MDXProvider }              from '@mdx-js/react';
import clsx                         from "clsx";

import theme        from "../../themes/main/theme";
import components   from "../common";

import Header   from "./header";
import Main     from "./main";
import Footer   from "./footer";
import Snackbar from "../snackbar";
import ImageViewer   from "../imageviewer";

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
        /*
        calc((100vw - 40rem) / 2):                  represents the total amount of remaining viewport space left before the 40rem breakport is hit
        calc(((100vw - 40rem) / 2) + 2rem):         this will leave a minimum margin of 2rem on either side of the grid
        calc(((100vw - 40rem) / 2 * 0.15) + 2rem):  15% of the remaining space will be used by the margins in addition to the 2rem minimum
        */
        '--content-margin': 'calc(((100vw - 39rem) / 2 * 0.15) + 1rem)'
    },
    //html: { scrollBehavior: 'smooth' },
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