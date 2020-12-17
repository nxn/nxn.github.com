import React from "react";
import styled from "@emotion/styled";
import theme from "./theme";
import clsx from "clsx";

import Header   from "./header";
import Content  from "./content";
import Footer   from "./footer";

import { withGlobal } from "./util";

import '../styles/reset.css';
import '../styles/fonts.css';

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

export function LayoutUnstyled(props: LayoutProps) {
    const variant = props.variant || 0;
    const unpadded = !!(variant & Variant.Unpadded);
    return (
        <div id="page" className={ clsx(props.className, props.variant) }>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" /> 
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
            </style>  

            <Header />
            <Content unpadded={ unpadded }>
                { props.children }
            </Content>
            <Footer />
        </div>
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
    body: {
        color:              theme.main.palette.page.text,
        backgroundColor:    theme.main.palette.body.background,
        fontFamily:         '"Open Sans", sans-serif',
        fontSize:           '1rem',
        lineHeight:         '1.75rem'
    }
}

export const Layout = styled(withGlobal(LayoutUnstyled, globalStyles))({
    minWidth:           '20rem',
    margin:             '0 auto',
    backgroundColor:    theme.main.palette.page.background,
    position:           'relative',
    paddingTop:         '4rem',
});

export default Layout;