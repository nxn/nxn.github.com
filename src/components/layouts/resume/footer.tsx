import React from "react";
import styled from "@emotion/styled";

type FooterProps = {
    className?: string
}

export function FooterUnstyled(props: FooterProps) {
    return (
        <footer id="resume-footer">
            <div id="copyright">&#169; 2020 Ernie Wieczorek</div>
        </footer>
    );
}

export const Footer = styled(FooterUnstyled)({

});

export default Footer;