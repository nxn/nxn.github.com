import React from "react";
import styled from "@emotion/styled";

import { Link } from "gatsby";
import graphics from "../images/graphics.svg";

type HeaderProps = {
    className?: string
};

export function HeaderUnstyled(props: HeaderProps) {
    return (
        <header className={ props.className }>
            <Link id="site-link" to="/">
                <svg id="site-name">
                    <title>nxn.io</title>
                    <use href={ `${ graphics }#nxn-text` } />
                </svg>
            </Link>

            <label id="menu-btn" htmlFor="menu-toggle">
                <svg className="icon"><use href={ `${ graphics }#icon-menu` } /></svg>
            </label>

            <input id="menu-toggle" type="checkbox" className="hidden" />
            
            <ul id="links">
                <li>
                    <Link to="/resume">
                        <svg className="icon"><use href={ `${ graphics }#icon-doc` } /></svg>
                        Resume
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <svg className="icon"><use href={ `${ graphics }#icon-mail` } /></svg>
                        Contact
                    </Link>
                </li>
                <li className="location">
                    <svg className="icon"><use href={ `${ graphics }#icon-geo` } /></svg>
                    Philadelphia
                </li>
            </ul> 
        </header>
    );
}

const Header = styled(HeaderUnstyled)(({theme}) => ({
    backgroundColor:        theme.palette.bgs.standard.dark,
    borderBottom:           `0.0625rem solid ${ theme.palette.accents.cyan }`,
    display:                'grid',
    //logo 5rem + 1rem left pad + 1rem right pad
    gridTemplateColumns:    '7rem 1fr',
    gridAutoFlow:           'dense',
    justifyItems:           'end',
    alignItems:             'center',
    position:               'absolute',
    zIndex:                 1,
    top:                    0,
    left:                   0,
    width:                  '100%',

    '& .hidden': {
        display: 'none !important'
    },

    '& #site-link': {
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        height:         '4rem',
        width:          '7rem',

        '& #site-name': {
            height: '3rem',
            width:  '5rem',
            fill:   theme.palette.accents.dark
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
            fill:   theme.palette.actions.secondary.main,
        },
        '&:hover .icon': {
            fill:   theme.palette.actions.secondary.light,
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
            gridColumn:     'span 1',
            paddingBottom:  0,
            justifyContent: 'flex-end',
            display:        'flex !important'
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
                fill:           theme.palette.text.alternate.main,
                marginRight:    '0.5rem'
            },

            '& a': {
                color:          theme.palette.text.alternate.main,
                textDecoration: 'none',
                display:        'inline-block',
                paddingRight:   '1rem',
            },

            '& a:hover': {
                color: theme.palette.text.alternate.light
            },

            '& a:hover .icon': {
                fill: `${ theme.palette.text.alternate.light } !important`
            }
        },

        '& .location': {
            display:    'none',
            color:      theme.palette.text.alternate.main,
            '@media (min-width: 41.5rem)': {
                display:        'inline-block',
                marginRight:    '2rem'
            }
        }
    }
}));

export default Header;