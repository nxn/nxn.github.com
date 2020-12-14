import React from "react";
import styled from "@emotion/styled";

import graphics from "../../../images/graphics.svg";

type HeaderProps = {
    className?: string
};

export function HeaderUnstyled(props: HeaderProps) {
    return (
        <header className={ props.className }>
            <a id="site-link" href="/">
                <svg id="site-name">
                    <title>nxn.io</title>
                    <use href={ `${ graphics }#nxn-text` } />
                </svg>
            </a>

            <label id="menu-btn" htmlFor="menu-toggle">
                <svg className="icon"><use href={ `${ graphics }#icon-menu` } /></svg>
            </label>

            <input id="menu-toggle" type="checkbox" className="hidden" />
            
            <ul id="links">
                <li className="doc">
                    <a className="pdf" href="/resume/">
                        <svg className="icon"><use href={ `${ graphics }#icon-doc` } /></svg>
                        Resume
                    </a>
                </li>

                <li className="email">
                    <svg className="icon"><use href={ `${ graphics }#icon-mail` } /></svg>
                    <svg className="address"><use href={ `${ graphics }#mail-address` } /></svg>
                </li>

                <li className="location">
                    <svg className="icon"><use href={ `${ graphics }#icon-geo` } /></svg>
                    Philadelphia, PA
                </li>
            </ul> 
        </header>
    );
}

const Header = styled(HeaderUnstyled)(({theme: { main: theme }}) => ({
    backgroundColor:        theme.palette.header.background,
    borderBottom:           `0.0625rem solid ${ theme.palette.page.border }`,
    display:                'grid',
    //logo 5rem + 1rem left pad + 1rem right pad
    gridTemplateColumns:    '7rem 1fr',
    gridAutoFlow:           'dense',
    justifyItems:           'end',
    alignItems:             'center',
    position:               'sticky',
    width:                  '100%',

    '& #site-link': {
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        height:         '4rem',
        width:          '7rem',

        '& #site-name': {
            height: '3rem',
            width:  '5rem',
            fill:   theme.palette.header.siteName
        }
    },
                
    '& #menu-btn': {
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        cursor:         'pointer',
        height:         '4rem',
        width:          '4rem',

        '@media (min-width: 41.5rem)': {
            display: 'none'
        },

        '& .icon': {
            height: '1.5rem',
            width:  '2rem',
            fill:   theme.palette.page.text
        }
    },
            
    '& #menu-toggle:checked + #links': {
        display: 'flex'
    },

    '& #links': {
        gridColumn:     'span 2',
        paddingBottom:  '0.5rem',
        width:          '100%',
        display:        'none',
        justifyContent: 'space-evenly',
        alignItems:     'center',

        '@media (min-width: 41.5rem)': {
            gridColumn: 'span 1',
            paddingBottom: 0,
            justifyContent: 'flex-end',
            display: 'flex !important'
        },

        '& li': {
            textAlign:      'left',
            lineHeight:     '2.5rem',
            marginRight:    '1rem',

            '& .icon': {
                display:        'inline-block',
                height:         '2.5rem',
                width:          '1.5rem',
                verticalAlign:  'top',
                fill:           theme.palette.header.link.text,
                marginRight:    '0.5rem'
            },

            '& a': {
                color:          theme.palette.header.link.text,
                display:        'inline-block',
                paddingRight:   '1rem',
            },

            '& a:hover': {
                color: theme.palette.header.link.hover,
            },

            '& a:hover .icon': {
                fill: `${ theme.palette.header.link.hover } !important`
            }
        },

        '& .location': {
            display:    'none',
            color:      theme.palette.header.text,
            '@media (min-width: 41.5rem)': {
                display: 'inline-block',
                marginRight: '2rem'
            }
        },

        '& .email .address': {
            height:         '0.85rem',
            width:          '6.4rem',
            marginTop:      '-0.0625rem',
            verticalAlign:  'middle',
            fill:           theme.palette.header.text
        }
    }
}));

export default Header;