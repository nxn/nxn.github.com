import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenImage, close } from "../state/viewer";
import clsx from "clsx";

import { alert, AlertData } from "../state/snackbar";

import { asHideable } from "./hideable";

import {
    CloseIcon,
    ZoomInIcon,
    ZoomOutIcon,
    ZoomToFitIcon,
    FullscreenIcon
} from "./graphics/icons";

const defaultZIndexBase = 1000;

const alerts = {
    loadingViewer: {
        type:           'working',
        message:        'Initializing viewer ...',
        noAutoDismiss:  true,
        undismissable:  true
    } as AlertData,

    loadingError: {
        type:           "error",
        title:          "Failed to initialize image viewer",
        message:        "An unexpected error occurred when initializing the image viewer. Please verify that you have internet access and try again.",
        noAutoDismiss:  true,
        undismissable:  true,
        actions:        [{ name: "Dismiss", dismiss: true }]
    } as AlertData,
}

export function ImageViewer() {
    const dispatch  = useDispatch();
    const image     = useSelector(selectOpenImage);

    const containerRef          = React.useRef<HTMLDivElement | null>(null);
    const [viewer, setViewer]   = React.useState<OpenSeadragon.Viewer | null>(null);

    const [uiVisible, setUIVisible] = React.useState(false);
    const [hideTimeout, setHideTimeout] = React.useState(0);

    const showUI = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setUIVisible(true);

        if (hideTimeout) {
            window.clearTimeout(hideTimeout);
        }

        if (event && event.target instanceof HTMLCanvasElement) {
            setHideTimeout(window.setTimeout(hideUI, 5000));
        }
    };

    const hideUI = () => {
        clearHideTimeout();
        setUIVisible(false);
    }

    const clearHideTimeout = () => { 
        if (hideTimeout) {
            window.clearTimeout(hideTimeout);
            setHideTimeout(0);
        }
    }

    React.useEffect(() => {
        if (!image) {
            window.document.body.classList.remove('no-scroll');
            if (viewer) {
                if (viewer.isFullPage()) {
                    viewer.setFullScreen(false);
                }
                viewer.close();
            }

            hideUI();
            return;
        }

        window.document.body.classList.add('no-scroll');
        if (viewer) {
            viewer.open(image.image);
            return;
        }

        const closeLoadingAlert = dispatch(alert(alerts.loadingViewer)) as unknown as () => void;

        import('openseadragon').then(({default: OpenSeadragon}) => {
            if (!containerRef.current) { 
                return;
            }

            OpenSeadragon.setString("Tooltips.ZoomIn",  "Zoom In");
            OpenSeadragon.setString("Tooltips.ZoomOut", "Zoom Out");
            OpenSeadragon.setString("Tooltips.Home",    "Fit to Screen");
            OpenSeadragon.setString("Tooltips.FullPage","Full Screen");
    
            const osd = new OpenSeadragon.Viewer({
                element:                containerRef.current,
                zoomPerScroll:          2.0,
                gestureSettingsMouse:   { clickToZoom: false, dblClickToZoom: true },
                zoomInButton:           "zoom-in",
                zoomOutButton:          "zoom-out",
                homeButton:             "reset",
                fullPageButton:         "full-page"
            });

            osd.open(image.image);

            //osd.addHandler('canvas-press', showUI);

            setViewer(osd);
        }).catch((reason) => {
            dispatch(close());
            dispatch(alert(alerts.loadingError));
            console.error(reason);
        }).finally(closeLoadingAlert);

    }, [ image ]);

    const handleCloseClick = () => dispatch(close());

    return (
        <Container ref={ containerRef } className={ clsx(!image && 'no-display') } onClick={ showUI } onMouseMove={ showUI }>
            <HideableTitlebar visible={ uiVisible } onMouseEnter={ clearHideTimeout }>
                <Title>{ image?.title || 'nxn.io' }</Title>
                <CloseButton title="Close" onClick={ handleCloseClick }>
                    <CloseIcon />
                </CloseButton>
            </HideableTitlebar>
            <HideableControls visible={ uiVisible } onMouseEnter={ clearHideTimeout }>
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
            </HideableControls>
        </Container>
    );
}

export const Container = styled.div(({ theme }) => ({
    position:           'fixed !important' as 'fixed',
    zIndex:             theme.zIndex.imageViewer || defaultZIndexBase,
    top:                0,
    left:               0,
    width:              '100vw',
    height:             '100vh',
    color:              theme.palette.text.standard.light,
    backgroundColor:    '#05070bee',
}));

const Titlebar = styled.div(({theme}) => ({
    position:           'absolute',
    top:                0,
    left:               0,
    zIndex:             (theme.zIndex.imageViewer || defaultZIndexBase) + 1,

    width:              '100vw',
    height:             '3rem',
    backgroundColor:    'rgba(0,0,0,0.5)',
    overflow:           'hidden',

    display:            'flex',
    justifyContent:     'space-between',
    alignItems:         'center'
}));

const HideableTitlebar = asHideable(Titlebar, { animation: 'slide', direction: 'top' });

const Title = styled.h3(({theme}) => ({
    marginLeft: '1rem',
    fontSize: '1.25rem',
    fontFamily: theme.typography.sans.fontFamily
}));

const Controls = styled.div(({theme}) => ({
    position:           'absolute',
    left:               '50%',
    bottom:             0,
    transform:          'translateX(-50%)',
    zIndex:             (theme.zIndex.imageViewer || defaultZIndexBase) + 1,

    margin:             '1rem auto',
    height:             '3rem',
    width:              'calc(100vw - 2rem)',
    maxWidth:           '20rem',
    borderRadius:       '0.3rem',
    backgroundColor:    'rgba(0,0,0,0.75)',

    display:            'flex',
    justifyContent:     'space-evenly',
    alignItems:         'center',
}));

const HideableControls = asHideable(Controls, { animation: 'slide', direction: 'bottom', shift: '-50%' });

const Button = styled.button(({theme}) => ({
    height:             '3rem',
    width:              '3rem',
    padding:            0,
    cursor:             'pointer',
    textAlign:          'center',
    verticalAlign:      'middle',
    backgroundColor:    'transparent',
    color:              theme.palette.actions.secondary.main,
    borderRadius:       '3rem',
    boxSizing:          'border-box',
    border:             '0.25rem solid transparent',

    '&:focus': { 
        outline: 0,
        boxShadow: `inset 0 0 0 0.25rem rgba(122,147,136,0.33)`
    },

    '& .icon': {
        width:          '1.5rem',
        height:         '1.5rem',
        verticalAlign:  'middle',
    },

    '&:hover': {
        color: theme.palette.actions.secondary.light,
    }
}));

const CloseButton = styled(Button)(({theme}) => ({
    '&:hover': {
        color: theme.palette.error.main
    }
}));

export default ImageViewer;