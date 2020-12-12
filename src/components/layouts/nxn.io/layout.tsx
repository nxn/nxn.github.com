import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

import Header from "./header";
import Footer from "./footer";

import { palette } from "./theme";
import { withGlobal } from "../../util";

import '../../../styles/reset.css';
import '../../../styles/fonts.css';

type LayoutProps = {
    banner?: React.ReactNode;
    variant?: "standard" | "error"
    children?: React.ReactNode;
    className?: string
}

export function LayoutUnstyled(props: LayoutProps) {
    return (
        <div id="page" className={ clsx(props.className, props.variant) }>
            <Header />

            { props.banner }

            { React.Children.count(props.children) > 0 &&
                <div id="content">
                    { props.children }
                </div>
            }

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
        color: palette.page.text,
        backgroundColor: palette.page.background,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '1rem',
        lineHeight: '1.5rem'
    }
}

export const Layout = styled(withGlobal(LayoutUnstyled, globalStyles))({
    minWidth:           '20rem',
    margin:             '0 auto',
    position:           'relative',
    backgroundColor:    palette.page.background,

    '& a': {
        color: palette.page.link.text,
        textDecoration: 'none'
    },

    '& a:hover': {
        color: palette.page.link.hover
    },

    '& .hidden': { display: 'none !important' },
    '& .accent': { color: palette.accent.standard }
});

export default Layout;