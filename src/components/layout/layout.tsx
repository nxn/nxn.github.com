import React                        from "react";
import styled                       from "@emotion/styled";
import { ThemeProvider, Global }    from "@emotion/react";
import { MDXProvider }              from '@mdx-js/react';
import clsx                         from "clsx";

import theme        from "../../themes/main/theme";
import components   from "../common";

import Header   from "./header";
import Main     from "./main";
import Footer   from "./footer";
import Snackbar from "../snackbar";

import '../../stylesheets/reset.css';
import '../../stylesheets/fonts.css';

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

    return (
        <ThemeProvider theme={ theme }>
            <Global styles={globalStyles} />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" /> 
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
            </style>

            <MDXProvider components={ components }>
                <Container id="layout" className={ clsx(props.className, props.variant) }>
                    <Header />
                    <Main unpadded={ unpadded }>
                        { props.children }
                    </Main>
                    <Footer />
                    <div id="modal-root">
                        <Snackbar />
                    </div>
                </Container>
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
        '--content-margin': 'calc(((100vw - 41.5rem) / 2 * 0.15) + 2rem)'
    },
    body: theme.styles.body
}

const Container = styled.div({
    minWidth:           '20rem',
    margin:             '0 auto',
    position:           'relative',
    paddingTop:         '4rem',
});

export default Layout;