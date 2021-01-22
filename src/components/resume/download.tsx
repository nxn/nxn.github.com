import React from "react";
import styled from "@emotion/styled";

import Link from '../controls/link';
import { DownloadIcon } from "../graphics/icons";

export function Download(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <DownloadLink { ...props } to="/downloads/ewieczorek_resume.pdf" title="Save PDF">
            <Icon />
        </DownloadLink>
    );
}

const Icon = styled(DownloadIcon)({
    width: '2.5rem',
    height: '2.5rem',
    display: 'block'
});

const DownloadLink = styled(Link)(({theme}) => ({
    boxSizing:      'border-box',
    padding:        '0.5rem',
    color:          theme.palette.accents.light,
    border:         `0.1875rem solid ${ theme.palette.accents.light }`,
    borderRadius:   '100%',

    '&:hover': {
        color:              theme.palette.nav.dim,
        borderColor:        theme.palette.nav.light,
        backgroundColor:    theme.palette.accents.white,
    }
}));

export default Download;