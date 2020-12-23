import React from "react";
import styled from "@emotion/styled";
import { useSelector } from 'react-redux'

import { selectAll, dismiss } from '../state/snackbar'

export type SnackbarProps = {
    className?: string
}

export function SnackbarUnstyled(props: SnackbarProps) {
    const alerts = useSelector((state) => state.snackbar) || [];
    console.log(alerts);
    return (
        <div className={ props.className }>
            { alerts.map(alert => (
                <Alert key={ alert.id } className={ alert.type }>
                    { alert.message }
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