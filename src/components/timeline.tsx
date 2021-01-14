import React from "react";
import styled from "@emotion/styled";

// TODO: Refactor these into component props and/or create a context for them
const timelineColor         = '#18252d';
const timelineDotColor      = '#7a9388';
const timelineDotRadius     = 0.75;
const timelineDotRadiusRem  = `${ timelineDotRadius }rem`;

// TODO: internalize offsetting right column of TimelineItems and internalize `right` | `left` classes so that user
// doesn't need to worry about providing and setting class names.
export const Timeline = styled.div(({theme}) => ({
    display:        'grid',
    alignItems:     'center',

    [theme.mediaQueries.standard]: {
        gridTemplateColumns: '1fr 1fr',

        backgroundImage: `linear-gradient(
            to bottom,
            ${ timelineColor } 0,
            ${ timelineColor } calc(100% - 16rem),
            transparent 100%
        )`,
        backgroundSize:     '0.5rem 100%',
        backgroundPosition: 'top center',
        backgroundRepeat:   'no-repeat',
    }
}));

export const TimelineHeading = styled.div(({theme}) => ({
    gridColumn:         '1 / -1',
    marginBottom:       '4.5rem',
    marginTop:          '3rem',

    justifySelf:        'center',
    fontFamily:         theme.typography.sans.fontFamily,
    fontSize:           '2rem',
    color:              theme.palette.actions.secondary.light,
    
    padding:            '0.75rem 3rem',
    borderRadius:       '0.5rem',

    [theme.mediaQueries.standard]: {
        backgroundColor:    timelineColor,
        marginBottom:       '3rem',
        marginTop:          '0rem',
    }
}));

export const TimelineItem = styled.div(({theme}) => ({
    minWidth:   0,
    position:   'relative',
    boxSizing:  'border-box',

    // Following is specific to the mobile version of the timeline
    padding:        '2.5rem 0',
    marginTop:      '-0.5rem',
    border:         '0.5rem solid transparent',
    borderRadius:   '2rem',

    '&.left': {
        paddingRight:   '1rem',
        background:     bgImageHalfFilledBorder('right', theme.palette.bgs.primary.dim, timelineColor)
    },
    '&.right': {
        paddingLeft:    '1rem',
        background:     bgImageHalfFilledBorder('left', theme.palette.bgs.primary.dim, timelineColor)
    },
    // end mobile

    [theme.mediaQueries.standard]: {
        gridRow: 'span 2',

        // undo mobile
        margin: 0,
        border: 0,
        padding: 0,
        borderRadius: 0,
        '&.left, &.right': {
            background: 'none',
            padding: 0
        }
    }
}));

export function TimelineDate(props: { children?: React.ReactNode }) {
    return (
        <TimelineDateContainer>
            <TimelineDateLine />
            <TimelineDateDot />
            <TimelineDateItem>
                { props.children }
            </TimelineDateItem>
        </TimelineDateContainer>
    );
}

export const TimelineEntry = styled.article(({theme}) => ({
    [theme.mediaQueries.standard]: {
        margin: '2rem auto',
        maxWidth: theme.typography.lineLength,
        '.left &': {
            paddingRight: `min(4rem, ${ theme.spacing.margins.horizontal })`
        },
        '.right &': {
            paddingLeft: `min(4rem, ${ theme.spacing.margins.horizontal })`
        }
        
        //padding: `0 ${ theme.spacing.margins.horizontal }`,
    }
}));



const TimelineDateContainer = styled.div(({theme}) => ({
    textAlign: 'center',

    // Following is specific to the mobile version of the timeline
    position:   'absolute',
    top:        '-0.25rem',
    left:       0,
    right:      0,
    transform: 'translateY(-50%)',
    // end mobile

    [theme.mediaQueries.standard]: {
        position: 'relative',

        // undo mobile
        top: 0,
        transform: 'none'
    }
}));

const TimelineDateDot = styled.div(({theme}) => ({
    [theme.mediaQueries.standard]: {
        width:      `${ timelineDotRadius * 2 }rem`,
        position:   'absolute',
        top:        0,
        bottom:     0,

        '.left &': { right: `-${ timelineDotRadiusRem }` },
        '.right &': { left: `-${ timelineDotRadiusRem }` },

        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center',
        backgroundImage:    bgImageCircle(
            timelineDotRadius,
            theme.palette.bgs.primary.dim,
            timelineDotColor,
            timelineDotRadiusRem
        ),
    }
}));

const TimelineDateLine = styled.div(({theme}) => ({
    [theme.mediaQueries.standard]: {
        position:   'absolute',
        top:        0,
        bottom:     0,

        '.left &': {
            left:   '50%',
            right:  0
        },

        '.right &': {
            left:   0,
            right:  '50%'
        },

        backgroundRepeat:   'repeat-x',
        backgroundSize:     '1rem 0.5rem',
        backgroundPosition: 'center',
        backgroundImage:    bgImageCircle(
            0.25,
            timelineColor,
            timelineColor,
            '0.25rem 0.25rem'
        ),
    }
}));

const TimelineDateItem = styled.div(({theme}) => ({
    display:    'inline-block',
    boxSizing:  'border-box',
    position:   'relative',

    fontSize:           '1.25rem',
    fontFamily:         theme.typography.sans.fontFamily,
    color:              theme.palette.actions.secondary.main,
    backgroundColor:    theme.palette.bgs.secondary.main,
    padding:            '0.5rem 2rem',
    border:             `0.25rem solid ${ timelineColor }`,
    borderRadius:       '0.5rem'
}));

function bgImageCircle(size: number, fillColor = 'currentcolor', strokeColor = 'currentcolor', position = 'center') {
    return `radial-gradient(
        circle at ${ position }, 
        ${ fillColor }      0, 
        ${ fillColor }      ${ size/2.0 - 0.0625 }rem,
        ${ strokeColor }    ${ size/2.0 }rem,
        ${ strokeColor }    ${ size - 0.0625 }rem,
        transparent         ${ size }rem
    )`;
}

function bgImageHalfFilledBorder(side: 'left' | 'right', fillColor = 'currentcolor', strokeColor = 'currentcolor') {
    return `linear-gradient(
        ${ fillColor },
        ${ fillColor }
    ) padding-box,
    linear-gradient(
        to ${ side },
        transparent,
        transparent 2rem,
        ${ strokeColor } 50%,
        ${ strokeColor } 50%,
        ${ strokeColor } 100%
    ) border-box`;
}

export default Timeline;
