import React    from "react";
import styled   from "@emotion/styled";
//import { graphql, useStaticQuery } from "gatsby";

import Logo             from "./logo";
import createNavMenu    from "./navmenu";

import { MenuIcon } from "../graphics";

type HeaderProps = {
    className?: string
};

export function Header(props: HeaderProps) {
    // const { site: { siteMetadata: { title } } } = useStaticQuery(graphql`query {
    //     site {
    //         siteMetadata {
    //             title
    //         }
    //     }
    // }`);

    return (
        <HeaderContainer className={ props.className }>
            <HeaderLogo variant="outlined" />

            <HeaderMenuButton htmlFor="menu-toggle">
                <MenuIcon />
            </HeaderMenuButton>

            <input id="menu-toggle" type="checkbox" className="no-display" />
            
            <HeaderNavMenu id="header-nav" />
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header({
    display: 'contents',
    '& #menu-toggle:checked + #header-nav': {
        display: 'initial'
    },
});

const HeaderLogo = styled(Logo)(({theme}) => ({
    gridArea:       'hd-logo',

    justifySelf:    'self-start',
    alignSelf:      'center',

    height:         '4rem',

    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',

    '& > svg': {
        // height: '3rem',
        // width:  '5rem',
        fill:   theme.palette.accents.dim
    }
}));

const HeaderMenuButton = styled.label(({theme}) => ({
    gridArea:       'hd-menu-button',
    cursor:         'pointer',
    height:         '4rem',
    width:          '4rem',

    justifySelf:    'self-end',
    alignSelf:      'center',

    display:        'flex',
    justifyContent: 'center',
    alignItems:     'center',

    '& .icon': {
        height: '1.5rem',
        width:  '2rem',
        fill:   theme.palette.actions.secondary.main
    },
    '&:hover .icon': {
        fill:   theme.palette.actions.secondary.light
    },

    [theme.mediaQueries.standard]: {
        display: 'none'
    },
}));

const Item = styled.li(({theme}) => ({
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
        padding:        '0.5rem',
    },

    '& a:hover': {
        color: theme.palette.text.alternate.light,
    },

    '& a:hover .icon': {
        fill: `${ theme.palette.text.alternate.light } !important`,
    },

    [theme.mediaQueries.standard]: {
        whiteSpace: 'nowrap',
        marginLeft: '0.5rem',
        '&:first-of-type': {
            marginLeft: 0
        },
        '& .icon': {
            display:        'inline-block',
            verticalAlign:  'top',
            marginRight:    '0.75rem',
            height:         '2rem'
        }
    }
}));

const List = styled.ul(({theme}) => ({
    display:        'flex',
    justifyContent: 'space-evenly',

    [theme.mediaQueries.standard]: {
        justifyContent: 'flex-end'
    },
}));

const HeaderNavMenu = styled(createNavMenu(List, Item))(({theme}) => ({
    gridArea:   'hd-nav',
    display:    'none',
    alignSelf:  'center',

    position:   'absolute',
    zIndex:     999,
    top:        0,
    left:       0,
    right:      0,
    backgroundColor: theme.palette.bgs.secondary.dark,
    borderBottom:   `0.0625rem solid ${ theme.palette.accents.cyan }`,

    [theme.mediaQueries.standard]: {
        position:       'relative',
        zIndex:         'initial',
        display:        'block',
        border:         'none',
    },
}));

export default Header;