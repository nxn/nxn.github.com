import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';
import clsx from "clsx";

import { Button, ButtonGroup } from './controls/button';
import { selectAll, dismiss, timeoutUpdate, SnackbarItem, SnackbarAction } from '../state/snackbar'
import { gridTemplate } from "../util";

import {
    SuccessIcon,
    WarnIcon,
    ErrorIcon,
    InfoIcon,
    SpinnerIcon
} from "./graphics/icons";

const defaultZIndexBase = 1000;

const resolveIcon = (alert: SnackbarItem) => {
    switch(alert.type) {
        case "success": return <SuccessIcon />
        case "error":   return <ErrorIcon />
        case "warning": return <WarnIcon />
        case "working": return <SpinnerIcon />
        default:        return <InfoIcon />
    }
}

export type SnackbarProps = {
    className?: string
}

export function SnackbarUnstyled(props: SnackbarProps) {
    const dispatch = useDispatch();
    const alerts = useSelector(selectAll);

    const handleActionClick = (alert: SnackbarItem, action: SnackbarAction) => {
        if (action.action) {
            dispatch(action.action);
        }

        if (action.dismiss) {
            dispatch(dismiss(alert.id));
        }
    };

    const handleMouseEnter = (alert: SnackbarItem, _event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (alert.undismissable || alert.noAutoDismiss) {
            return;
        }

        if (alert.timeout) {
            window.clearTimeout(alert.timeout);
            dispatch(timeoutUpdate({ id: alert.id, value: 0 }));
        }
    };

    const handleMouseLeave = (alert: SnackbarItem, _event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (alert.undismissable || alert.noAutoDismiss) {
            return;
        }
        
        dispatch(timeoutUpdate({
            id: alert.id,
            value: window.setTimeout(() => dispatch(dismiss(alert.id)), alert.duration)
        }));
    };

    return (
        <div className={ props.className }>
            { alerts.map(alert => (
                <Alert
                    key             = { alert.id } 
                    className       = { clsx(alert.type, alert.actions && alert.actions.length > 0 ? 'full' : 'minimal') } 
                    onMouseEnter    = { (event) => handleMouseEnter(alert, event) } 
                    onMouseLeave    = { (event) => handleMouseLeave(alert, event) }>

                    <Icon>{ resolveIcon(alert) }</Icon>
                    <Message>
                        { !!alert.title && <Title>{ alert.title }</Title> }
                        { alert.message }
                    </Message>
                    <Actions fullWidth className="actions">
                    { alert.actions && alert.actions.map((item, index) => (
                        <Button variant="minimal" key={ index } onClick={ () => handleActionClick(alert, item) }>
                            { item.name }
                        </Button>
                    ))}
                    { !alert.undismissable &&
                        <Button variant="minimal" onClick={ () => dispatch(dismiss(alert.id)) }>
                            Dismiss
                        </Button>
                    }
                    </Actions>
                </Alert>
            ))}
        </div>
    );
}

const Snackbar = styled(SnackbarUnstyled)(({theme}) => ({
    position:   'fixed',
    zIndex:     theme.zIndex.snackbar || defaultZIndexBase,
    bottom:     '2rem',
    left:       '50%',
    transform:  'translateX(-50%)',
    minWidth:   '18rem',
    maxWidth:   '48rem',

    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexFlow:       'column nowrap',
}));

const Alert = styled.div(({theme}) => ({
    margin:     '0.5rem 0',
    overflow:   'hidden',

    display:    'grid',
    alignItems: 'center',

    userSelect:         'none',
    borderRadius:       '0.5rem',
    boxShadow:          '0.0625rem 0.25rem 0.5rem black',
    color:              theme.palette.text.standard.light,
    backgroundColor:    theme.palette.bgs.alerts.info,
    
    '&.success':    { backgroundColor: theme.palette.bgs.alerts.success },
    '&.error':      { backgroundColor: theme.palette.bgs.alerts.error },
    '&.warning':    { backgroundColor: theme.palette.bgs.alerts.warning },

    '&.minimal': {
        gridTemplateColumns:    'auto 1fr auto',
        gridTemplateAreas:      gridTemplate('icon message actions')
    },

    '&.full': {
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas: gridTemplate(
            'icon       message',
            'actions    actions'
        )
    },
}));

const Icon = styled.div({
    gridArea:   'icon',
    width:      '3rem',
    '& > svg.icon': {
        display:        'block',
        margin:         '0 auto',
        width:          '1.5rem',
        height:         '1.5rem',
        verticalAlign:  'middle',
    }
});

const Message = styled.div({
    gridArea:   'message',
    padding:    '0.5rem 1rem 0.5rem 0',
    fontSize:   '0.9rem',
    lineHeight: '1.5rem',
    boxSizing:  'border-box',
});

const Title = styled.div({
    fontWeight: 'bold',
    paddingBottom: '0.5rem'
});

const Actions = styled(ButtonGroup)({
    gridArea:           'actions',
    backgroundColor:    'rgba(0,0,0,0.33)',
});

export default Snackbar;