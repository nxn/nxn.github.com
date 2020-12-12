import React from "react";
import styled from "@emotion/styled";

import Header from "./header";
import Footer from "./footer";

import '../../../styles/reset.css';
import '../../../styles/fonts.css';

type LayoutProps = {
    children?: React.ReactNode;
    className?: string
}

export function LayoutUnstyled(props: LayoutProps) {
    return (
        <div id="page" className={ props.className }>
            <Header />

            { React.Children.count(props.children) > 0 &&
                <div id="content">
                    { props.children }
                </div>
            }

            <Footer />
        </div>
    );
}

export const Layout = styled(LayoutUnstyled)({

});

export default Layout;

