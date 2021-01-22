import React    from "react";
import styled   from "@emotion/styled";
import Link     from "../controls/link";

import {
    MailIcon,
    LinkIcon,
    GeoIcon,
    EmailAddress,
} from "../graphics"


export function ListUnstyled(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) {
    return (
        <ul { ...props }>
            <li className="email">
                <MailIcon />
                <EmailAddress className="address" />
            </li>
            <li className="web">
                <Link to="/" title="Portfolio Website">
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

export const List = styled(ListUnstyled)(({theme}) => ({
    display:        'flex',
    flexDirection:  'column',
    listStyle:      'none',

    '& li': {
        lineHeight: '1.66rem',
        height: '1.66rem',
        padding: 0,

        '& .icon': {
            display: 'inline-block',
            height: '1.66rem',
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
        fill:           'currentcolor'
    }
}));

export default List;