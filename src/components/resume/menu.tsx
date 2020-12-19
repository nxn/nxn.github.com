import React from "react";
import styled from "@emotion/styled";

import graphics from "../../images/graphics.svg";

type MenuProps = {
    className?: string
}

export function MenuUnstyled(props: MenuProps) {
    return (
        <ul className={ props.className }>
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
    );
}

export const Menu = styled(MenuUnstyled)(({theme}) => ({
    display:        'flex',
    flexDirection:  'column',
    listStyle:      'none',

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
        padding: 0,

        '@media print': {
            lineHeight: '1.66rem',
            height: '1.66rem'
        },

        '& .icon': {
            display: 'inline-block',
            height: '2.5rem',
            width: '1.5rem',
            verticalAlign: 'top',
            fill: theme.palette.accents.light,
            marginRight: '0.5rem',

            '@media print': {
                lineHeight: '1.66rem',
                height: '1.66rem'
            },
        },

        '& a': {
            color: theme.palette.nav.main,
            textDecoration: 'none',
            display: 'inline-block', /* inline to not stretch in mobile mode */
            paddingRight: '1rem'
        },

        '& a:hover': {
            color: theme.palette.nav.dark,
            '& .icon': {
                fill: theme.palette.nav.light
            }
        }
    },

    '& .email .address': {
        height:         '0.85rem',
        width:          '6.4rem',
        marginTop:      '-0.0625rem',
        verticalAlign:  'middle',
        fill:           theme.palette.nav.main
    }
}));

export default Menu;