import React from "react";
import styled from "@emotion/styled";

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

export const Footer = styled(FooterUnstyled)(({theme: { resume: theme }}) => ({
    '& #copyright': {
        color:      theme.palette.gray,
        fontSize:   '0.9rem',
        textAlign:  'left',
        padding:    '1rem 0 0 0'
    },

    '@media print': {
        display: 'none'
    }
}));

export default Footer;