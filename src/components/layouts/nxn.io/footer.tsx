import React from "react";
import styled from "@emotion/styled";

import { palette } from "./theme";

type FooterProps = {
    className?: string
}

export function FooterUnstyled(props: FooterProps) {
    return (
        <footer className={ props.className }>
            <span id="copyright">&#169; 2020 Ernie Wieczorek</span>
        </footer>
    );
}

export const Footer = styled(FooterUnstyled)({

});

export default Footer;