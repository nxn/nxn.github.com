import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonGroup } from './controls/button';
import { selectAll, dismiss, timeoutUpdate, SnackbarItem, SnackbarAction } from '../state/snackbar'

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
        if (alert.timeout) {
            window.clearTimeout(alert.timeout);
            dispatch(timeoutUpdate({ id: alert.id, value: 0 }));
        }
    };

    const handleMouseLeave = (alert: SnackbarItem, _event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
                    className       = { alert.type } 
                    onMouseEnter    = { (event) => handleMouseEnter(alert, event) } 
                    onMouseLeave    = { (event) => handleMouseLeave(alert, event) }>

                    <Message>{ alert.message }</Message>

                    <Actions fullWidth>
                        { alert.actions && alert.actions.map((item, index) => (
                        <Button variant="minimal" key={ index } onClick={ () => handleActionClick(alert, item) }>
                            { item.name }
                        </Button>
                        ))}
                        <Button variant="minimal" color="secondary" onClick={ () => dispatch(dismiss(alert.id)) }>
                            Dismiss
                        </Button>
                    </Actions>

                    
                </Alert>
            ))}
        </div>
    );
}

const Snackbar = styled(SnackbarUnstyled)(({theme}) => ({
    position: 'fixed',
    zIndex: 999,
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',

    display: 'flex',
    //border: '1px solid red',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
    minWidth: '18rem',
    maxWidth: '48rem'
}));

const Alert = styled.div(({theme, children}) => ({
    margin: '0.5rem 0',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: React.Children.count(children) > 1 ? 'column' : 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',

    color: theme.palette.text.standard.light,
    backgroundColor: theme.palette.bgs.standard.main,
    borderRadius: '0.5rem',
    boxShadow: '0.0625rem 0.25rem 0.5rem black'
}));

const Message = styled.span(({ theme }) => ({
    padding: '0.5rem 1rem',
    gridArea: 'message',
    fontSize: '0.9rem',
}));

const Actions = styled(ButtonGroup)(({ theme }) => ({
    gridArea: 'actions',
    '& > .button': {
        minWidth: '6.25rem'
    }
}));



export default Snackbar;