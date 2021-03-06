import React from 'react';
import styled, { Interpolation } from '@emotion/styled';

import { Link, LinkProps } from './controls/link';

// TODO: Should accept 'variant' prop that corresponds to `theme.styles.headings` allowing any style to be mapped to any
// component. Saving this for later because the actual theme heading styles need to be finalized first.
type LinkHeaderProps = LinkProps & {
    component:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    startIcon?: React.ReactNode,
    endIcon?:   React.ReactNode,
}

export function LinkHeader(props: LinkHeaderProps) {
    const { startIcon, endIcon, children, component, ...other } = props;

    // Memoize to not generate a new component on each render
    const Heading = React.useMemo(
        () => styled(component)(baseHeadingStyle), 
        [ component, baseHeadingStyle ]
    );
    
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

    // TODO: Remove this when `variant` prop exists
    fontSize:   '1.5rem',
    fontFamily: theme.typography.slab.fontFamily,
    height:     '2.5rem',
    lineHeight: '2.5rem',
    // end remove

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

const baseHeadingStyle: Interpolation<{}> = {
    whiteSpace:     'nowrap',
    overflow:       'hidden',
    textOverflow:   'ellipsis',
    boxSizing:      'border-box',
    marginRight:    '1rem',
};