import React from "react";
import styled from "@emotion/styled";

import { palette } from "./theme";
import graphics from "../../../images/graphics.svg";

type FooterProps = {
    className?: string
}

export function FooterUnstyled(props: FooterProps) {
    return (
        <footer className={ props.className }>
            <div id="footer-logos">
                <svg className="icon"><use href={ `${ graphics }#logo-no-outline` } /></svg>
                <svg className="text"><use href={ `${ graphics }#nxn-text` } /></svg>
            </div>

            <ul id="footer-list">
                <li>
                    <span className="item">
                        <svg className="icon"><use href={ `${ graphics }#icon-mail` } /></svg>
                        <svg className="address"><use href={ `${ graphics }#mail-address` } /></svg>
                    </span>
                </li>
                <li>
                    <a className="item" href="/resume/">
                        <svg className="icon"><use href={ `${ graphics }#icon-doc` } /></svg>
                        Resume
                    </a>
                </li>
                <li>
                    <a className="item" href="https://github.com/nxn/" target="_blank" rel="noreferrer">
                        <svg className="icon"><use href={ `${ graphics }#icon-github` } /></svg>
                        nxn
                    </a>
                </li>
                <li>
                    <span className="item">
                        <svg className="icon"><use href={ `${ graphics }#icon-geo` } /></svg>
                        Philadelphia
                    </span>
                </li>
            </ul>

            <div id="footer-info">
                The personal portfolio of Ernie Wieczorek. Contains summary of recent ventures, discoveries, and guidance
                on technical matters. This website does not use cookies nor does it gather any information about its visitors.
            </div>

            <div id="footer-copyright">
                &#169; 2020 <span className="bold">Ernie Wieczorek</span>
            </div>
        </footer>
    );
}

export const Footer = styled(FooterUnstyled)({
    padding:            '2rem',
    borderTop:          `0.0625rem solid ${ palette.page.border }`,
    color:              palette.footer.text,
    backgroundColor:    palette.footer.background,
    fontSize:           '0.9rem',
    display:            'grid',
    gap:                '1rem',
    justifyContent:     'space-evenly',

    gridTemplate: `
        "logos"
        "list"
        "info"
        "copyright"
    `,

    '@media (min-width: 41.5rem)': {
        padding:        '2rem var(--content-margin)',
        gridTemplate: `
            "logos      list"
            "info       list"
            "copyright  list"
        `
    },

    '& .bold': {
        fontWeight: 'bold',
    },

    '& #footer-logos': {
        gridArea: 'logos',
        '& svg': {
            width:          '3rem',
            height:         '2.25rem',
            marginRight:    '1.5rem',
            fill:           palette.footer.text
        }
    },

    '& #footer-copyright': {
        gridArea: 'copyright',
    },

    '& #footer-info': {
        gridArea:   'info',
        maxWidth:   '48rem',
    },

    '& #footer-list': {
        gridArea:   'list',
        display:    'flex',
        flexFlow:   'column nowrap',
        minWidth:   '8rem',
        '& .item': {
            color:          palette.footer.link.text,
            display:        'inline-block',
            lineHeight:     '2.5rem',
            paddingRight: '1rem'
        },
    
        '& .icon, & .address': {
            height:         "2.5rem",
            width:          "1.25rem",
            marginRight:    "0.75rem",
            verticalAlign:  "top",
            fill:           palette.footer.text
        },

        '& .address': {
            width: '5.55520625rem',
            marginRight: 0
        },
    
        '& a:hover': {
            color: palette.footer.link.hover,
            '& .icon': {
                fill: palette.footer.link.hover
            }
        }
    }
});

export default Footer;