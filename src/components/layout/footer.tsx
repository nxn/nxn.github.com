import React                        from "react";
import styled                       from "@emotion/styled";
import { graphql, useStaticQuery }  from "gatsby";

import Link from "../controls/link";

import {
    Logo,
    HomeIcon,
    BookIcon,
    DocIcon,
    MailIcon,
    GithubIcon,
    GeoIcon
} from "../graphics";


export function Footer() {
    const { site: { siteMetadata: { description } } } = useStaticQuery(graphql`query {
        site {
            siteMetadata {
                description
            }
        }
    }`);
    return (
        <FooterContainer>
            <FooterLogos>
                <Logo className="icon" variant="standard" />
                <Logo className="text" variant="text" />
            </FooterLogos>

            <FooterNav>
                <Item>
                    <Link to="/">
                        <HomeIcon />
                        Home
                    </Link>
                </Item>
                <Item>
                    <Link to="/posts">
                        <BookIcon />
                        Posts
                    </Link>
                </Item>
                <Item>
                    <Link to="/contact">
                        <MailIcon />
                        Contact
                    </Link>
                </Item>
                <Item>
                    <Link to="/resume">
                        <DocIcon />
                        Resume
                    </Link>
                </Item>
            </FooterNav>

            <FooterMisc>
                <Item>
                    <Link to="https://github.com/nxn/">
                        <GithubIcon />
                        nxn@github
                    </Link>
                </Item>
                <Item>
                    <span>
                        <GeoIcon />
                        Philadelphia
                    </span>
                </Item>
            </FooterMisc>

            <FooterInfo>
                { description }
                <br /><br />
                &#169; 2020 <strong>Ernie Wieczorek</strong>
            </FooterInfo>

        </FooterContainer>
    );
}

const FooterLogos = styled.div(({theme}) => ({
    gridArea: 'logos',

    '& svg': {
        width:  '3rem',
        height: '2.5rem',
        fill:   theme.palette.text.alternate.main
    },

    '& .icon': {
        marginRight:    '1.5rem',
    }
}));

const Item = styled.li(({theme}) => ({
    '& > *': {
        color:          theme.palette.text.alternate.main,
        display:        'inline-block',
        lineHeight:     '2.5rem',
        paddingRight:   '1rem'
    },

    '& .icon': {
        height:         "2.5rem",
        width:          "1.25rem",
        marginRight:    "0.75rem",
        verticalAlign:  "top",
        fill:           theme.palette.text.alternate.main
    },

    '& a': {
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.text.alternate.light,
            '& .icon': {
                fill: theme.palette.text.alternate.light
            }
        }
    }
}));

const FooterList = styled.ul(({theme}) => ({
    display:        'flex',
    flexDirection:  'column',
    flexWrap:       'nowrap',
}));

const FooterNav = styled(FooterList)(({theme}) => ({
    gridArea:   'nav',
    alignSelf:  'self-start'
}));

const FooterMisc = styled(FooterList)(({theme}) => ({
    gridArea:   'misc',
    alignSelf:  'self-end',

    [theme.mediaQueries.standard]: {
        alignSelf: 'self-start',
    }
}));

const FooterInfo = styled.div(({theme}) => ({
    gridArea:   'info',
    maxWidth:   theme.typography.lineLength,
    justifySelf: 'center',
    lineHeight: '1.5rem',

    [theme.mediaQueries.standard]: {
        paddingTop: '0.5rem',
    }
}));

export const FooterContainer = styled.div(({theme}) => ({
    padding:            '1rem',
    borderTop:          `0.0625rem solid ${ theme.palette.accents.cyan }`,
    color:              theme.palette.text.alternate.main,
    backgroundColor:    theme.palette.bgs.secondary.dim,
    fontSize:           '0.9rem',

    display:                'grid',
    gap:                    '1rem',
    justifyContent:         'space-evenly',
    alignItems:             'flex-start',
    gridTemplateColumns:    '1fr auto',
    gridTemplateAreas: `
        "logos      nav"
        "misc       nav"
        "info       info"
        "copyright  copyright"
    `,

    '& strong': {
        fontWeight: 'bold',
    },

    [theme.mediaQueries.standard]: {
        padding:                `2rem ${ theme.spacing.margins.horizontal }`,
        columnGap:              theme.spacing.margins.horizontal,
        justifyContent:         'center',
        gridTemplateColumns:    `8.5rem minmax(16rem, 48rem) 8.5rem`,
        gridTemplateRows:       '2.5rem 1fr',
        gridTemplateAreas: `
            "logos  info    nav"
            "misc   info    nav"
        `
    },
}));

export default Footer;