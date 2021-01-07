import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenImage, close } from "../state/viewer";
import clsx from "clsx";

import {
    CloseIcon,
    ZoomInIcon,
    ZoomOutIcon,
    ZoomToFitIcon,
    FullscreenIcon
} from "./graphics/icons";

export function Viewer() {
    const dispatch  = useDispatch();
    const image     = useSelector(selectOpenImage);

    React.useLayoutEffect(() => {
        if (image) {
            window.document.body.classList.add('no-scroll');
        }
        else {
            window.document.body.classList.remove('no-scroll');
        }
    }, [ image ]);

    const handleClose = () => dispatch(close());

    return (
        <Container className={ clsx(!image && 'hidden') }>
            <Titlebar>
                <Title>{ image?.title || 'nxn.io' }</Title>
                <CloseButton title="Close" onClick={ handleClose }>
                    <CloseIcon />
                </CloseButton>
            </Titlebar>
            <Controls>
                <Panel>
                    <Button id="zoom-in">
                        <ZoomInIcon />
                    </Button>
                    <Button id="zoom-out">
                        <ZoomOutIcon />
                    </Button>
                    <Button id="reset">
                        <ZoomToFitIcon />
                    </Button>
                    <Button id="full-page">
                        <FullscreenIcon />
                    </Button>
                </Panel>
            </Controls>
        </Container>
    );
}

export const Container = styled.div(({theme}) => ({
    position:           'fixed',
    top:                0,
    left:               0,
    width:              '100vw',
    height:             '100vh',
    zIndex:             1000,
    color:              theme.palette.text.standard.light,
    backgroundColor:    '#05070bee'
}));

const Titlebar = styled.div({
    position:           'absolute',
    left:               0,
    zIndex:             1001,
    opacity:            1,
    visibility:         'visible',
    transition:         'opacity 0.1s linear',

    top:                0,
    width:              '100vw',
    height:             '3rem',
    backgroundColor:    'rgba(0,0,0,0.5)',
    overflow:           'hidden',

    display:            'flex',
    justifyContent:     'space-between',
    alignItems:         'center'
});

const Title = styled.h3({
    marginLeft: '1rem'
});

const Controls = styled.div({
    position:           'absolute',
    left:               0,
    zIndex:             1001,
    opacity:            1,
    visibility:         'visible',
    transition:         'opacity 0.1s linear',

    bottom:             0,
    width:              'calc(100vw - 2rem)',
    margin:             '1rem'
});

const Panel = styled.div({
    backgroundColor:    'rgba(0,0,0,0.75)',
    margin:             '0 auto',
    height:             '3rem',
    maxWidth:           '20rem',
    borderRadius:       '0.3rem',
    display:            'flex',
    alignItems:         'center',
    justifyContent:     'space-evenly',
});

const Button = styled.button(({theme}) => ({
    height:             '3rem',
    width:              '3rem',
    padding:            0,
    cursor:             'pointer',
    textAlign:          'center',
    verticalAlign:      'middle',
    lineHeight:         '3rem',
    backgroundColor:    'transparent',
    color:              theme.palette.actions.secondary.main,
    border:             0,

    '& .icon': {
        width:          '1.5rem',
        height:         '1.5rem',
        lineHeight:     '3rem',
        verticalAlign:  'middle',
    },

    '&:hover': {
        color: theme.palette.actions.secondary.light
    }
}));

const CloseButton = styled(Button)(({theme}) => ({
    '&:hover': {
        color: theme.palette.error.main
    }
}));

export default Viewer;