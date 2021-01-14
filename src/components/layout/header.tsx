import React from "react";
import styled from "@emotion/styled";

import Link from "../controls/link";
//import graphics from "../images/graphics.svg";

import {
    Logo,
    MenuIcon,
    HomeIcon,
    BookIcon,
    DocIcon,
    MailIcon,
} from "../graphics";

type HeaderProps = {
    className?: string
};

export function HeaderUnstyled(props: HeaderProps) {
    return (
        <header className={ props.className }>
            
            <Link id="site-link" to="/">
                <Logo id="site-name" title="nxn.io" variant="text" />
            </Link>

            <label id="menu-btn" htmlFor="menu-toggle">
                <MenuIcon />
            </label>

            <input id="menu-toggle" type="checkbox" className="no-display" />
            
            <ul id="links">
                <li>
                    <Link to="/">
                        <HomeIcon />
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/posts">
                        <BookIcon />
                        Posts
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <MailIcon />
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to="/resume">
                        <DocIcon />
                        Resume
                    </Link>
                </li>
            </ul> 
        </header>
    );
}

const Header = styled(HeaderUnstyled)(({theme}) => ({
    backgroundColor:        theme.palette.bgs.secondary.dark,
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

    '& #site-link': {
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        height:         '4rem',
        width:          '7rem',

        '& #site-name': {
            height: '3rem',
            width:  '5rem',
            fill:   theme.palette.accents.dim
        }
    },
                
    '& #menu-btn': {
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
        cursor:         'pointer',
        height:         '4rem',
        width:          '4rem',

        [theme.mediaQueries.standard]: {
            display: 'none'
        },

        '& .icon': {
            height: '1.5rem',
            width:  '2rem',
            fill:   theme.palette.actions.secondary.main
        },
        '&:hover .icon': {
            fill:   theme.palette.actions.secondary.light
        }
    },
            
    '& #menu-toggle:checked + #links': {
        display: 'flex'
    },

    '& #links': {
        gridColumn:     'span 2',
        width:          '100%',
        display:        'none',
        justifyContent: 'space-evenly',
        alignItems:     'center',

        '& .icon': {
            display:        'block',
            margin:         '0 auto',
            height:         '1.5rem',
            width:          '1.5rem',
            fill:           theme.palette.text.alternate.main,
        },

        '& a': {
            display:        'inline-block',
            color:          theme.palette.text.alternate.main,
            textAlign:      'center',
            textDecoration: 'none',
            lineHeight:     '2rem',
            padding:        '1rem',
        },

        '& a:hover': {
            color: theme.palette.text.alternate.light,
        },

        '& a:hover .icon': {
            fill: `${ theme.palette.text.alternate.light } !important`,
        },

        [theme.mediaQueries.standard]: {
            gridColumn:     'span 1',
            justifyContent: 'flex-end',
            display:        'flex',

            paddingRight: '1rem',
            '& a': {
                //marginRight: '0.75rem'
            },
            '& .icon': {
                display:        'inline-block',
                verticalAlign:  'top',
                marginRight:    '0.75rem',
                height:         '2rem'
            }
        },
    }
}));

export default Header;