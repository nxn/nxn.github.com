import React from 'react';
import styled, { Interpolation } from '@emotion/styled';

import { Link, LinkProps } from './controls/link';

// TODO: Should accept 'variant' prop that corresponds to `theme.styles.headings` allowing any style to be mapped to any
// component.
type LinkHeaderProps = LinkProps & {
    component:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    startIcon?: React.ReactNode,
    endIcon?:   React.ReactNode,
}

export function LinkHeader(props: LinkHeaderProps) {
    const { startIcon, endIcon, children, component, ...other } = props;
    // TODO: This should probably be memoized since it creates a component dynamically on each render
    const Heading = styled(component)(headingStyle);
    return (
        <LinkContainer { ...other }>
            { startIcon }
            <Heading>{ children }</Heading>
            { endIcon }
        </LinkContainer>
    )
}

export const LinkContainer = styled(Link)(({theme}) => ({
    ...theme.styles.text.anchor,

    display:    'flex',
    width:      'min-content',
    maxWidth:   '100%',
    flexFlow:   'row nowrap',
    alignItems: 'flex-start',

    fontSize:   '1.5rem',
    fontFamily: theme.typography.slab.fontFamily,
    height:     '2.5rem',
    lineHeight: '2.5rem',

    '& > .icon': {
        width:              '2.5rem',
        height:             '2.5rem',
        padding:            '0.5rem',
        boxSizing:          'border-box',
        borderRadius:       '1.25rem',
        color:              theme.palette.actions.primary.main,
        backgroundColor:    theme.palette.bgs.primary.main,
        
    },

    '&:hover > .icon': {
        color:              theme.palette.actions.primary.light,
        backgroundColor:    theme.palette.bgs.primary.light
    },

    '&:hover': {
        color: theme.palette.actions.primary.main,
    }
}));

const headingStyle: Interpolation<{}> = {
    whiteSpace:     'nowrap',
    overflow:       'hidden',
    textOverflow:   'ellipsis',
    boxSizing:      'border-box',
    marginRight:    '1rem',
};