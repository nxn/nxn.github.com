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

    const showUI = () => {
        setUIVisible(true);

        if (hideTimeout) {
            window.clearTimeout(hideTimeout);
        }

        setHideTimeout(window.setTimeout(() => {
            setUIVisible(false);
            setHideTimeout(0);
        }, 5000));
    };

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

            //osd.addHandler('canvas-press', showViewerUI);

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
    left:               0,
    zIndex:             (theme.zIndex.imageViewer || defaultZIndexBase) + 1,
    opacity:            1,
    visibility:         'visible',

    top:                0,
    width:              '100vw',
    height:             '3rem',
    backgroundColor:    'rgba(0,0,0,0.5)',
    overflow:           'hidden',

    display:            'flex',
    justifyContent:     'space-between',
    alignItems:         'center'
}));

const HideableTitlebar = asHideable(Titlebar, { animation: 'slide', direction: 'top' });

const Title = styled.h3({
    marginLeft: '1rem'
});

const Controls = styled.div(({theme}) => ({
    position:           'absolute',
    left:               0,
    zIndex:             (theme.zIndex.imageViewer || defaultZIndexBase) + 1,
    opacity:            1,
    visibility:         'visible',

    bottom:             0,
    width:              'calc(100vw - 2rem)',
    margin:             '1rem',
}));

const HideableControls = asHideable(Controls, { animation: 'slide', direction: 'bottom' });

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

export default ImageViewer;