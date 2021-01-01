import React    from "react";
import styled   from "@emotion/styled";
import Link     from "../controls/link";

import {
    Logo,
    HomeIcon,
    BookIcon,
    DocIcon,
    MailIcon,
    GithubIcon,
    GeoIcon
} from "../graphics";

type FooterProps = {
    className?: string
}

export function FooterUnstyled(props: FooterProps) {
    return (
        <footer className={ props.className }>
            <div id="footer-logos">
                <Logo className="icon" variant="standard" />
                <Logo className="text" variant="text" />
            </div>

            <ul id="footer-nav">
                <li>
                    <Link className="item" to="/">
                        <HomeIcon />
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="item" to="/posts">
                        <BookIcon />
                        Posts
                    </Link>
                </li>
                <li>
                    <Link className="item" to="/contact">
                        <MailIcon />
                        Contact
                    </Link>
                </li>
                <li>
                    <Link className="item" to="/resume">
                        <DocIcon />
                        Resume
                    </Link>
                </li>
            </ul>

            <ul id="footer-misc">
                <li>
                    <Link className="item" to="https://github.com/nxn/">
                        <GithubIcon />
                        nxn
                    </Link>
                </li>
                <li>
                    <span className="item">
                        <GeoIcon />
                        Philadelphia
                    </span>
                </li>
            </ul>

            <div id="footer-info">
                The personal portfolio of Ernie Wieczorek. Contains summary of recent ventures, discoveries, and 
                guidance on technical matters. This website does not use cookies, it does not gather data about its 
                visitors, nor does it send any information to third parties.
            </div>

            <div id="footer-copyright">
                &#169; 2020 <strong>Ernie Wieczorek</strong>
            </div>
        </footer>
    );
}

export const Footer = styled(FooterUnstyled)(({theme}) => ({
    padding:            '2rem',
    borderTop:          `0.0625rem solid ${ theme.palette.accents.cyan }`,
    color:              theme.palette.text.alternate.main,
    backgroundColor:    theme.palette.bgs.secondary.dark,
    fontSize:           '0.9rem',

    display:                'grid',
    gap:                    '1rem',
    justifyContent:         'space-evenly',
    alignItems:             'center',
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

    '& #footer-logos': {
        gridArea: 'logos',
        '& svg': {
            width:          '3rem',
            height:         '2.5rem',
            fill:           theme.palette.text.alternate.main
        },

        '& .icon': {
            marginRight:    '1.5rem',
        }
    },

    '& #footer-nav, & #footer-misc': {
        display:        'flex',
        flexDirection:  'column',
        flexWrap:       'nowrap',
        '& .item': {
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
    },

    '& #footer-nav': {
        gridArea:   'nav',
        alignSelf:  'self-start'
    },

    '& #footer-misc': {
        gridArea:   'misc',
        alignSelf:  'self-end'
    },

    '& #footer-info': {
        gridArea:   'info',
        //maxWidth:   '48rem',
        lineHeight: '1.5rem'
    },

    '& #footer-copyright': {
        gridArea: 'copyright',
        lineHeight: '2.5rem'
    },

    '@media (min-width: 41.5rem)': {
        padding:                '2rem var(--content-margin)',
        columnGap:              'var(--content-margin)',
        gridTemplateColumns:    'auto 1fr auto',
        gridTemplateAreas: `
            "logos      misc        nav"
            "info       info        nav"
            "copyright  copyright   nav"
        `,

        '& #footer-misc': {
            flexDirection:  'row',
            justifyContent: 'space-around',
            alignSelf:      'self-start'
        }
    },
}));

export default Footer;