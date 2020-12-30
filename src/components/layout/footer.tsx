import React    from "react";
import styled   from "@emotion/styled";
import Link     from "../controls/link";

import {
    Logo,
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

            <ul id="footer-list">
                <li>
                    <Link className="item" to="/resume">
                        <DocIcon />
                        Resume
                    </Link>
                </li>
                <li>
                    <Link className="item" to="/contact">
                        <MailIcon />
                        Contact
                    </Link>
                </li>
                <li>
                    <a className="item" href="https://github.com/nxn/" target="_blank" rel="noreferrer">
                        <GithubIcon />
                        nxn
                    </a>
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
    display:            'grid',
    gap:                '1rem',
    justifyContent:     'space-evenly',

    gridTemplate: `
        "logos"
        "list"
        "info"
        "copyright"
    `,

    '@media (min-width: 41.5rem)': {
        padding:        '2rem var(--content-margin)',
        gridTemplate: `
            "logos      list"
            "info       list"
            "copyright  list"
        `
    },

    '& strong': {
        fontWeight: 'bold',
    },

    '& #footer-logos': {
        gridArea: 'logos',
        '& svg': {
            width:          '3rem',
            height:         '2.25rem',
            marginRight:    '1.5rem',
            fill:           theme.palette.text.alternate.main
        }
    },

    '& #footer-copyright': {
        gridArea: 'copyright',
    },

    '& #footer-info': {
        gridArea:   'info',
        maxWidth:   '48rem',
        lineHeight: '1.5rem'
    },

    '& #footer-list': {
        gridArea:   'list',
        display:    'flex',
        flexFlow:   'column nowrap',
        minWidth:   '8rem',
        '& .item': {
            color:          theme.palette.text.alternate.main,
            display:        'inline-block',
            lineHeight:     '2.5rem',
            paddingRight: '1rem'
        },
    
        '& .icon, & .address': {
            height:         "2.5rem",
            width:          "1.25rem",
            marginRight:    "0.75rem",
            verticalAlign:  "top",
            fill:           theme.palette.text.alternate.main
        },

        '& .address': {
            width: '5.55520625rem',
            marginRight: 0
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

    }
}));

export default Footer;