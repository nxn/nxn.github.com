import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonGroup } from './button';
import { selectAll, dismiss, SnackbarItem, SnackbarAction } from '../state/snackbar'

export type SnackbarProps = {
    className?: string
}

export function SnackbarUnstyled(props: SnackbarProps) {
    const dispatch = useDispatch();
    const alerts = useSelector(selectAll);

    const handleActionClick = (alert: SnackbarItem, action: SnackbarAction) => {
        dispatch(action.action);

        if (action.dismiss) {
            dispatch(dismiss(alert.id));
        }
    }

    return (
        <div className={ props.className }>
            { alerts.map(alert => (
                <Alert key={ alert.id } className={ alert.type }>
                    { alert.message }
                    { alert.actions && alert.actions.length > 0 &&
                        <ButtonGroup>
                            { alert.actions.map((item, index) => (
                                <Button key={ index } onClick={ () => handleActionClick(alert, item) }>
                                    { item.name }
                                </Button>
                            ))}
                        </ButtonGroup>
                    }
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

const Alert = styled.div(({theme}) => ({
    padding: '1rem 2rem',
    margin: '0.5rem 0',
    color: theme.palette.text.standard.light,
    backgroundColor: theme.palette.bgs.standard.main,
    borderRadius: '0.25rem',
    boxShadow: '0.0625rem 0.25rem 0.25rem black'
}));

export default Snackbar;