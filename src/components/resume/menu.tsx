import React    from "react";
import styled   from "@emotion/styled";
import Link     from "../controls/link";

import {
    DocIcon,
    MailIcon,
    LinkIcon,
    GeoIcon,
    EmailAddress,
} from "../graphics"

type MenuProps = {
    className?: string
}

export function MenuUnstyled(props: MenuProps) {
    return (
        <ul className={ props.className }>
            <li className="doc">
                <Link className="pdf" to="/downloads/ewieczorek_resume.pdf" target="_blank">
                    <DocIcon />
                    Download PDF
                </Link>
            </li>
            <li className="email">
                <MailIcon />
                <EmailAddress className="address" />
            </li>
            <li className="web">
                <Link to="/">
                    <LinkIcon />
                    www.nxn.io
                </Link>
            </li>
            <li className="location">
                <GeoIcon />
                Philadelphia, PA
            </li>
        </ul>
    );
}

export const Menu = styled(MenuUnstyled)(({theme}) => ({
    display:        'flex',
    flexDirection:  'column',
    listStyle:      'none',

    [`@media screen and (min-width: ${ theme.breakPoints.standard }rem)`]: {
        flexDirection:  'row',
        justifyContent: 'space-between'
    },

    [theme.mediaQueries.print]: {
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

        [theme.mediaQueries.print]: {
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

            [theme.mediaQueries.print]: {
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
            color: theme.palette.nav.dim,
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