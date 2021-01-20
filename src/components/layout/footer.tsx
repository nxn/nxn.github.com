import React                        from "react";
import styled                       from "@emotion/styled";
import { graphql, useStaticQuery }  from "gatsby";

import Link             from "../controls/link";
import Logo             from "./logo";
import createNavMenu    from "./navmenu";
import {
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
            <FooterLogo />
            <FooterNavMenu />
            <FooterMisc>
                <Item>
                    <Link to="https://github.com/nxn/"><GithubIcon />nxn@github</Link>
                </Item>
                <Item>
                    <span><GeoIcon />Philadelphia</span>
                </Item>
            </FooterMisc>
            <FooterInfo><Text>{ description }</Text></FooterInfo>
            <FooterCopyright><Text>&#169; 2021 <strong>Ernie Wieczorek</strong></Text></FooterCopyright> 
        </FooterContainer>
    );
}

const Text = styled.div(({theme}) => ({
    maxWidth: theme.typography.lineLength.regular,
    [theme.mediaQueries.standard]: {
        margin: `0 ${ theme.spacing.margins.horizontal }`
    }
}));

const Item = styled.li(({theme}) => ({
    '& > *': {
        color:          theme.palette.text.alternate.main,
        display:        'inline-block',
        lineHeight:     theme.typography.lineHeight.entity,
        //paddingRight:   '1rem'
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

const List = styled.ul({
    display:        'flex',
    flexDirection:  'column',
    flexWrap:       'nowrap',
});

const FooterNavMenu = styled(createNavMenu(List, Item))({
    gridArea:       'ft-nav',
    minWidth:       'max-content',

    justifySelf:    'self-end',
    alignSelf:      'self-start',
});

const FooterLogo = styled(Logo)({
    gridArea:       'ft-logo',
    height:         '2.5rem',

    justifySelf:    'self-start',
    alignSelf:      'self-start',
});

const FooterMisc = styled(List)({
    gridArea:       'ft-misc',
    minWidth:       'max-content',

    justifySelf:    'self-start',
    alignSelf:      'self-start',
    marginTop:      '2.5rem',
});

const FooterInfo = styled.div(({theme}) => ({
    gridArea:       'ft-info',
    minWidth:       '18rem',

    justifySelf:    'self-start',
    alignSelf:      'center',

    lineHeight:     theme.typography.lineHeight.dense,
    margin:         `1rem 0`,
    [theme.mediaQueries.standard]: {
        margin: 0
    }
}));

const FooterCopyright = styled.div(({theme}) => ({
    gridArea:       'ft-copyright',
    lineHeight:     theme.typography.lineHeight.sparse,

    justifySelf:    'self-start',
    alignSelf:      'self-end',
    '& strong': {
        fontWeight: 'bold',
    },
}));

const FooterContainer = styled.footer(({theme}) => ({
    display:            'contents',
    color:              theme.palette.text.alternate.main,
    fontSize:           '0.9rem',
}));

export default Footer;