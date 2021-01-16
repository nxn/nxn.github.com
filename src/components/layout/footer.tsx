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
                        <HomeIcon /> Home
                    </Link>
                </Item>
                <Item>
                    <Link to="/posts">
                        <BookIcon /> Posts
                    </Link>
                </Item>
                <Item>
                    <Link to="/contact">
                        <MailIcon /> Contact
                    </Link>
                </Item>
                <Item>
                    <Link to="/resume">
                        <DocIcon /> Resume
                    </Link>
                </Item>
            </FooterNav>

            <FooterMisc>
                <Item>
                    <Link to="https://github.com/nxn/">
                        <GithubIcon /> nxn@github
                    </Link>
                </Item>
                <Item>
                    <span>
                        <GeoIcon /> Philadelphia
                    </span>
                </Item>
            </FooterMisc>

            <FooterInfo>
                { description }
            </FooterInfo>

            <FooterCopyright>
                &#169; 2020 <strong>Ernie Wieczorek</strong>
            </FooterCopyright> 

        </FooterContainer>
    );
}

const Item = styled.li(({theme}) => ({
    '& > *': {
        color:          theme.palette.text.alternate.main,
        display:        'inline-block',
        lineHeight:     theme.typography.lineHeight.entity,
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

const FooterList = styled.ul({
    display:        'flex',
    flexDirection:  'column',
    flexWrap:       'nowrap',
});

const FooterLogos = styled.div(({theme}) => ({
    gridArea:       'logos',
    height:         '2.5rem',

    // Top Left
    justifySelf:    'self-start',
    alignSelf:      'self-start',

    '& svg': {
        width:  '3rem',
        height: '2.5rem',
        fill:   theme.palette.text.alternate.main
    },

    '& .icon': {
        marginRight:    '1.5rem',
    }
}));

const FooterMisc = styled(FooterList)({
    gridArea:       'misc',
    minWidth:       'max-content',

    // Bottom Left
    justifySelf:    'self-start',
    alignSelf:      'self-start',
    marginTop:      '2.5rem',
});

const FooterInfo = styled.div(({theme}) => ({
    gridArea:       'info',

    // Center
    justifySelf:    'center',
    alignSelf:      'center',

    lineHeight:     theme.typography.lineHeight.dense,
    margin:         '1rem 0',
    [theme.mediaQueries.standard]: {
        margin: 0
    }
}));

const FooterNav = styled(FooterList)({
    gridArea:       'nav',
    minWidth:       'max-content',

    // Top Left
    justifySelf:    'self-start',
    alignSelf:      'self-start',
});

const FooterCopyright = styled.div(({theme}) => ({
    gridArea:       'copyright',
    lineHeight:     theme.typography.lineHeight.sparse,
    justifySelf:    'self-start',
    alignSelf:      'self-end',
    '& strong': {
        fontWeight: 'bold',
    },
}));

const FooterContainer = styled.div(({theme}) => ({
    padding:            '1rem',
    borderTop:          `0.0625rem solid ${ theme.palette.accents.cyan }`,
    color:              theme.palette.text.alternate.main,
    backgroundColor:    theme.palette.bgs.secondary.dim,
    fontSize:           '0.9rem',

    display:                'grid',
    
    justifyContent:         'space-evenly',
    alignItems:             'flex-start',
    gridTemplateColumns:    '1fr auto',
    gridTemplateRows:       '2.5rem',
    
    gridTemplateAreas: `
        "logos      nav"
        "misc       nav"
        "info       info"
        "copyright  copyright"
    `,

    [theme.mediaQueries.standard]: {
        padding:                `2rem ${ theme.spacing.margins.horizontal }`,
        columnGap:              theme.spacing.margins.horizontal,
        justifyContent:         'center',
        gridTemplateColumns:    `auto minmax(16rem, calc(${ theme.typography.lineLength.regular } * 0.9)) auto`,
        gridTemplateRows:       '2.5rem auto 2.5rem',
        gridTemplateAreas: `
            "logos  info        nav"
            "misc   info        nav"
            "misc   copyright   nav"
        `
    },
}));

export default Footer;