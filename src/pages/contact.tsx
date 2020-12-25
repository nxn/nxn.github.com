import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import Layout from "../components/layout";
import { PageHeading } from "../components/common";
import { Button, ButtonGroup } from "../components/button";
import { TextField } from "../components/textfield";
import { notify } from "../state/snackbar";
import {
    selectAll,
    selectIndex,
    clear 
} from "../state/message";

/* Contact Page
The contact form uses uncontrolled components that, during certain key events, transmit their state to a redux store.
This enables the form to have time travel capability via redux-undo, and also enables the state to be saved to 
`localStorage` without having to directly manage persistance here.

The field events that trigger the state to be transmitted to redux are:
    `onBlur`: state is saved immediately
    `onInput`: only happens if there is a specified and uninterrupted delay following the last user input.
*/

import graphics from "../images/graphics.svg";

// Fields will be autosaved this many milliseconds after the last user modification.
const autoSaveDelay = 500;

// Shown as tooltips and/or error messages if javascript is disabled and we are unable to specify custom validation
// messages instead.
const requirements: { [ key: string ]: string } = {
    subject:    'Subject line cannot be blank or empty',
    body:       'Message cannot be blank or empty',
    address:    'Must be a valid email address, for example: "your.address@example.com"' 
}

export function ContactPage() {
    const dispatch      = useDispatch();
    const message       = useSelector(selectAll);

    const [autoSave, setAutoSave] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);

    const clearForm = () => {
        // Any existing autoSave timeout should be cancelled so that it doesn't interfere with the state after the form
        // has been cleared.
        if (autoSave) {
            clearTimeout(autoSave);
            setAutoSave(0);
        }
        dispatch(clear());
    }

    const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        // Any existing auto-save timer can be cancelled and an immediate save can be performed instead of waiting.
        if (autoSave) {
            clearTimeout(autoSave);
            setAutoSave(0);
        }
        const { name, value } = event.target;
        dispatch({ type: `message/${ name }Update`, payload: value });
    }

    const handleFieldInput = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;

        // Form Auto-Save:
        // On each input cancel any existing timeout and set a new one. This effectively prevents the auto-save from
        // triggering while user modifications are still being made. In order for auto-save to execute, a period of
        // `autoSaveDelay` must pass uninterrupted since the last user input.
        if (autoSave) {
            clearTimeout(autoSave);
        }
        setAutoSave(
            window.setTimeout(
                () => dispatch({ type: `message/${ name }Update`, payload: value }), 
                autoSaveDelay
            )
        );
    }

    const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
        clearForm();

        const form = event.target as HTMLFormElement;
        form.querySelectorAll('.invalid').forEach((element: Element) => {
            element.classList.remove('invalid');
        });

        notify({
            type: "info",
            message: "Draft has been discarded.",
            actions: [{
                name: "Undo", dismiss: true, action: { type: 'message/undo' }
            }]
        });
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //setDisabled(true);

        // email.send(
        //     config.serviceID, 
        //     config.templateID, 
        //     formValues
        // ).then(handleSendSuccess, handleSendError);

        return false;
    }

    // const handleSendSuccess = () => {
    //     setSeverity('success');
    //     setShowResult(true);
    //     clearForm();
    //     setDisabled(false);
    // }

    // const handleSendError = (_reason: any) => {
    //     setSeverity('error');
    //     setShowResult(true);
    //     setDisabled(false);
    // }

    return (
        <Layout>
            <Content>
                <PageHeading>Send <span className="accent">Ernie</span> a message:</PageHeading>
                <br />
                <Email id="email-form" onSubmit={ handleFormSubmit } onReset={ handleFormReset }>
                    <Subject required
                        type            = "text"
                        pattern         = ".*\S+.*"
                        title           = { requirements.subject }
                        defaultValue    = { message.subject }
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        name            = "subject"
                        placeholder     = "Subject" />

                    <Body required multiline
                        title           = { requirements.message }
                        defaultValue    = { message.body }
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        rows            = { 5 }
                        name            = "body"
                        placeholder     = "Message" />

                    <Address required
                        type            = "email"
                        pattern         = "[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                        title           = { requirements.address }
                        defaultValue    = { message.address }
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        name            = "address" 
                        placeholder     = "Your email" />
                        
                    <Actions>
                        <Button type="submit" color="primary">
                            <svg className="icon"><use href={ `${ graphics }#icon-send` } /></svg>
                            Send It
                        </Button>
                        <Button type="reset" color="secondary">
                            <svg className="icon"><use href={ `${ graphics }#icon-trash` } /></svg>
                            Discard
                        </Button>
                    </Actions>
                </Email>
            </Content>
        </Layout>
    );
}

const Content = styled.div(({ theme }) => ({
    maxWidth:   '48rem',
    margin:     '0 auto',
    '& .accent': {
        color: theme.palette.accents.green
    },
}));

const Email = styled.form({
    display:    'grid',
    gap:        '1rem',
    gridTemplateRows: '1fr auto 1fr 0.5rem 1fr',
    gridTemplateAreas: `
        "subject"
        "body"
        "address"
        "spacer"
        "actions"
    `,

    '@media (min-width: 41.5rem)': {
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: '1fr auto 1fr',
        gridTemplateAreas: `
            "subject    subject"
            "body       body"
            "address    actions"
        `,
    }
});

const Subject = styled(TextField)({
    gridArea:   'subject'
});

const Body = styled(TextField)({
    gridArea:   'body',
    resize:     'vertical',
    minHeight:  '10rem'
});

const Address = styled(TextField)({
    gridArea:   'address'
});

const Actions = styled(ButtonGroup)({
    gridArea:   'actions',
    alignSelf:  'center'
});

export default ContactPage;