import React from "react";
import styled from "@emotion/styled";

import { palette } from "./theme";
import graphics from "../../../images/graphics.svg";

type HeaderProps = {
    className?: string
};

export function HeaderUnstyled(props: HeaderProps) {
    return (
        <header className={ props.className }>
            <div>
                <h1>Ernie Wieczorek</h1>
                <div className="sub-title">Computer Software Developer</div>
            </div>
            <ul id="contact">
                <li className="doc">
                    <a className="pdf" href="<%= require('./downloads/ewieczorek.pdf').default %>" target="_blank">
                        <svg className="icon">
                            <use href={ `${ graphics }#icon-doc` } />
                        </svg>
                        Download PDF
                    </a>
                </li>
                <li className="email">
                    <svg className="icon"><use href={ `${ graphics }#icon-mail` } /></svg>
                    <svg className="address"><use href={ `${ graphics }#mail-address` } /></svg>
                </li>
                <li className="web">
                    <a href="/">
                        <svg className="icon">
                            <use href={ `${ graphics }#icon-web` } />
                        </svg>
                        www.nxn.io
                    </a>
                </li>
                <li className="location">
                    <svg className="icon">
                        <use href={ `${ graphics }#icon-geo` } />
                    </svg>
                    Philadelphia, PA
                </li>
            </ul>
        </header>
    );
};

export const Header = styled(HeaderUnstyled)({
    '@media print': {
        display:                'grid',
        gridTemplateColumns:    '1fr auto'
    },

    '& .sub-title': {
        fontFamily: '"Roboto Slab", serif',
        fontSize:   '1.25rem',
        lineHeight: '2rem'
    },

    '& #contact': {
        display:        'flex',
        flexDirection:  'column',
        margin:         '1rem 0',
        padding:        '0.5rem 0',
        borderWidth:    '0.25rem',
        borderStyle:    'solid',
        borderImage:    `linear-gradient(to right, ${ palette.accent.subtle }, rgba(247, 247, 247, 0)) 100% 1`,
        borderLeft:     0,
        borderRight:    0,

        '@media screen and (min-width: 48rem)': {
            flexDirection:  'row',
            justifyContent: 'space-between'
        },

        '@media print': {
            border:     0,
            padding:    0,
            margin:     0,

            '& li.doc': {
                display: 'none'
            }
        },

        '& li': {
            textAlign: 'left',
            lineHeight: '2.5rem',

            '@media print': {
                lineHeight: '1.66rem',
                height: '1.66rem'
            },

            '& .icon': {
                display: 'inline-block',
                height: '2.5rem',
                width: '1.5rem',
                verticalAlign: 'top',
                fill: palette.icon.fill,
                marginRight: '0.5rem',

                '@media print': {
                    lineHeight: '1.66rem',
                    height: '1.66rem'
                },
            },

            '& a': {
                color: palette.header.link.text,
                textDecoration: 'none',
                display: 'inline-block', /* inline to not stretch in mobile mode */
                paddingRight: '1rem'
            },

            '& a:hover': {
                color: palette.header.link.hover,
                '& .icon': {
                    fill: palette.icon.hover
                }
            }
        },

        '& .email .address': {
            height:         '0.85rem',
            width:          '6.4rem',
            marginTop:      '-0.0625rem',
            verticalAlign:  'middle',
            fill:           palette.page.text
        }
    }
});

export default Header;