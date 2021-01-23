import React    from "react";
import styled   from "@emotion/styled";

import { Link, LinkProps }  from '../controls/link';
import { DownArrowIcon }    from "../graphics/icons";
import { DownloadIcon }     from "../graphics/icons";
import { getFileExt }       from "../../util";

export function FileLink(props: LinkProps & { variant?: 'standard' | 'extension' }) {
    const { variant, ...other } = props;
    const ext = getFileExt(props.to || props.href || '')?.toUpperCase();
    return (
        <File title={ ext ? `Save ${ ext }` : 'Save' } { ...other }>
            { variant === 'extension' && ext ? (
                <React.Fragment>
                    <SmallIcon />
                    <Extension>{ ext }</Extension>
                </React.Fragment>
            ) : <FullIcon /> }
        </File>
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

const File = styled(Link)(({theme}) => ({
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

const Extension = styled.div(({theme}) => ({
    textAlign:      'center',
    fontWeight:     'bold',
    fontSize:       '0.8rem',
    width:          '100%',
    
    color: theme.palette.bgs.standard.main,
}));

export default FileLink;