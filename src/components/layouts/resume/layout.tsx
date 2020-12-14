import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import Header   from "./header";
import Content  from "./content";
import Footer   from "./footer";

import theme from "../../theme";
import { withGlobal } from "../../util";

import '../../../styles/reset.css';
import '../../../styles/fonts.css';

type LayoutProps = {
    children?: React.ReactNode;
    className?: string
}

export function LayoutUnstyled(props: LayoutProps) {
    return (
        <ThemeProvider theme={ theme }>
            <div id="page" className={ props.className }>
                <Header />
                <Content>
                    { props.children }
                </Content>
                <Footer />
            </div>
        </ThemeProvider>
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

    'h1, h2, h3, h4, h5, .title':   { color:        theme.resume.palette.header.text },
    'h1, h3':                       { fontFamily:   '"Oswald", sans-serif' },
    'h2, h4, h5, .title':           { fontFamily:   '"Roboto Slab", serif' },
    'h5, .title':                   { fontWeight:   700 },

    h1: { 
        fontSize:   '3rem',
        lineHeight: '1.0em'
    },
    h2: {
        fontSize:       '2rem',
        margin:         '2rem 0 2rem 0',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center'
    },
    'h2 .icon': { 
        height:     '1.6375rem',
        width:      '2.0rem',
        opacity:    '0.2',
        margin:     '0.1rem 1rem 0 -3rem'
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
    }
}

export const Layout = styled(withGlobal(LayoutUnstyled, globalStyles))({
    maxWidth:   '64rem',
    minWidth:   '17.5rem', /* ~280px with 20px of padding on each side */
    margin:     '0 auto'
});

export default Layout;

