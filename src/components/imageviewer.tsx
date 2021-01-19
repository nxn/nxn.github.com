import React                        from "react";
import styled                       from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenImage, close }   from "../state/viewer";
import clsx                         from "clsx";

import { alert, AlertData } from "../state/snackbar";
import { asHideable }       from "./hideable";

import {
    CloseIcon,
    ZoomInIcon,
    ZoomOutIcon,
    ZoomToFitIcon,
    FullscreenIcon
} from "./graphics/icons";

const defaultZIndexBase = 1000;
const noScrollClassName = 'no-scroll';
const hiddenClassName   = 'no-display';

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

const viewerSettings = {
    zoomPerScroll:          2.0,
    gestureSettingsMouse:   { clickToZoom: false, dblClickToZoom: true },
    zoomInButton:           "zoom-in",
    zoomOutButton:          "zoom-out",
    homeButton:             "reset",
    fullPageButton:         "full-page"
}

const viewerTooltipStrings: { [key: string]: string } = {
    "Tooltips.ZoomIn":      "Zoom In",
    "Tooltips.ZoomOut":     "Zoom Out",
    "Tooltips.Home":        "Fit to Screen",
    "Tooltips.FullPage":    "Full Screen",
}

export function ImageViewer() {
    const dispatch  = useDispatch();
    const image     = useSelector(selectOpenImage);

    const containerRef  = React.useRef<HTMLDivElement | null>(null);
    const viewer        = React.useRef<OpenSeadragon.Viewer | null>(null);
    const clickTimeout  = React.useRef(0);

    const [uiVisible, setUIVisible] = React.useState(true);

    const openImage = () => {
        if (!viewer.current || !image) { return; }

        const bodyClassList = window.document.body.classList;
        if (!bodyClassList.contains(noScrollClassName)) {
            bodyClassList.add(noScrollClassName);
        }

        viewer.current.open(image.image);
        setUIVisible(true);

        if (containerRef.current) {
            const canvas = containerRef.current.querySelector<HTMLElement>('.openseadragon-canvas');
            if (canvas) { canvas.focus(); }
        }
    }

    const closeViewer = () => {
        const bodyClassList = window.document.body.classList;
        if (bodyClassList.contains(noScrollClassName)) {
            bodyClassList.remove(noScrollClassName);
        }

        if (viewer.current) {
            const instance = viewer.current;
            if (instance.isFullPage()) {
                instance.setFullScreen(false);
            }
            instance.close();
        }

        setUIVisible(false);
    }

    const handleCloseClick = () => dispatch(close());

    // OpenSeadragon API states an `originalEvent` property will be available, but it doesn't actually list it on the
    // type definition for `ViewerEvent`.
    function handleViewerKeydown(e: OpenSeadragon.ViewerEvent & { originalEvent?: KeyboardEvent }) {
        const event = e.originalEvent;

        // Must check event type as this handler sometimes gets called twice (for `keydown` and `keypress`)
        if (!event || event.type !== 'keydown') { return; }

        if (event.key === 'Escape') {
            setUIVisible(false);
        }
        else if (event.key === ' ') {
            setUIVisible(v => !v);
        }
        else {
            setUIVisible(true);
        }
    }

    // Sets a timeout for executing an action that should be performed on a single click. If there's no follow up click
    // it will be executed, otherwise it will be cancelled by the double click handler.
    function handleViewerClick(e: OpenSeadragon.ViewerEvent) {
        if (!e.quick) { return; }

        if (clickTimeout.current) { window.clearTimeout(clickTimeout.current); }

        // Wait to verify it's not a double click
        clickTimeout.current = window.setTimeout(() => {
            // Toggle the UI Visibility
            setUIVisible(v => !v);
            clickTimeout.current = 0;
        }, 300);
    }

    // Uses the double click event to cancel the single click handler from executing its action
    function handleViewerDoubleClick() {
        if (clickTimeout.current) {
            window.clearTimeout(clickTimeout.current);
            clickTimeout.current = 0;
        };
    }

    React.useEffect(() => {
        // No image state, close viewer if open
        if (!image) {
            closeViewer();
            return;
        }

        // If a viewer instance is already available, use it to open the image
        if (viewer.current) {
            openImage();
            return;
        }

        // Load and init the viewer, then open the image
        const closeLoadingAlert = dispatch(alert(alerts.loadingViewer)) as unknown as () => void;
        import('openseadragon').then(({default: OpenSeadragon}) => {
            if (!containerRef.current) { return; }

            // Set tooltip strings
            for (let key of Object.keys(viewerTooltipStrings)) {
                OpenSeadragon.setString(key, viewerTooltipStrings[key]);
            }
    
            // Init viewer instance
            const osd = new OpenSeadragon.Viewer({
                element: containerRef.current,
                ...viewerSettings,
            });

            // Assign event handlers
            osd.addHandler('canvas-click',          handleViewerClick);
            osd.addHandler('canvas-double-click',   handleViewerDoubleClick);
            osd.addHandler('canvas-key',            handleViewerKeydown);

            // Save the viewer instance
            viewer.current = (osd);

            // Open the image
            openImage();
        }).catch((reason) => {
            dispatch(close());
            dispatch(alert(alerts.loadingError));
            console.error(reason);
        }).finally(closeLoadingAlert);

    }, [ image ]);

    return (
        <Container ref={ containerRef } className={ clsx(!image && hiddenClassName) }>
            <HideableTitlebar visible={ uiVisible }>
                <Title>{ image?.title || 'nxn.io' }</Title>
                <CloseButton title="Close" onClick={ handleCloseClick }>
                    <CloseIcon />
                </CloseButton>
            </HideableTitlebar>
            <HideableControls visible={ uiVisible }>
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
    width:              '100%',
    height:             '100%',
    color:              theme.palette.text.standard.light,
    backgroundColor:    '#05070bee',

    // Removes focus outline from canvas element. This typically wasn't visible to begin with since the canvas spans the
    // entire viewport and the outline was being drawn out of bounds of it, however, on some devices it made the screen
    // look broken. If an actual focus decoration is necessary it should be done in some other way.
    '& canvas:focus': { outline: 'none' }
}));

const Titlebar = styled.div(({theme}) => ({
    minWidth:           '20rem',
    position:           'fixed',
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
    fontFamily: theme.typography.sans.fontFamily,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
}));

const Controls = styled.div(({theme}) => ({
    position:           'fixed',
    left:               '50%',
    bottom:             0,
    transform:          'translateX(-50%)',
    zIndex:             (theme.zIndex.imageViewer || defaultZIndexBase) + 1,

    margin:             '1rem auto',
    height:             '3rem',
    width:              '18rem',
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