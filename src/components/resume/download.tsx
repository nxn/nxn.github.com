import React from "react";
import styled from "@emotion/styled";

import Link from '../controls/link';
import { DownArrowIcon } from "../graphics/icons";
import { DownloadIcon } from "../graphics/icons";

export function Download(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { extension?: string }) {
    return (
        <DownloadLink { ...props } to="/downloads/ewieczorek_resume.pdf" title="Save PDF">
            { props.extension ? (
                <React.Fragment>
                    <SmallIcon />
                    <Text>{ props.extension }</Text>
                </React.Fragment>
            ) : <FullIcon /> }
        </DownloadLink>
    );
}

const FullIcon = styled(DownloadIcon)(({theme}) => ({
    width:              '100%',
    height:             '100%',
    padding:            '0.5rem',
    boxSizing:          'border-box',
    backgroundColor:    theme.palette.bgs.standard.main,
}));

const SmallIcon = styled(DownArrowIcon)(({theme}) => ({
    width:              '100%',
    height:             '2.25rem',
    padding:            '0.25rem',
    boxSizing:          'border-box',
    backgroundColor:    theme.palette.bgs.standard.main,
}));

const DownloadLink = styled(Link)(({theme}) => ({
    boxSizing:      'border-box',
    color:          theme.palette.accents.light,
    border:         `0.125rem solid ${ theme.palette.accents.light }`,
    backgroundColor: theme.palette.accents.light,
    borderRadius:   '0.5rem',

    display:        'flex',
    justifyItems:   'center',
    alignItems:     'center',
    width:          '4rem',
    height:         '4rem',
    flexDirection:  'column',
    textDecoration: 'none',

    overflow:       'hidden',

    transform:      'rotate(-10deg)',

    transitionProperty: 'transform',
    transitionDuration: '250ms',

    '&:hover': {
        color:              theme.palette.nav.dim,
        borderColor:        theme.palette.nav.light,
        backgroundColor:    theme.palette.nav.light,

        '& > svg': {
            backgroundColor: theme.palette.accents.white
        },
        '& > div': {
            color: theme.palette.accents.white
        },

        transform: 'rotate(0deg)'
    },

    '&:active': { transform: 'scale(0.90)' },
    '&:focus':  { outline: 0 }
}));

const Text = styled.div(({theme}) => ({
    textTransform:  'uppercase',
    textAlign:      'center',
    fontWeight:     'bold',
    fontSize:       '0.8rem',
    width:          '100%',
    
    color: theme.palette.bgs.standard.main,
}));

export default Download;