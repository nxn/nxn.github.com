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
    Message,
    selectAll,
    selectIndex,
    update,
    clear 
} from "../state/message";

/* Contact Page
This page uses local component state for storing live user input, however, it also transmits this state to a redux store
during certain key events. This enables the form to have time travel capacity via redux-undo, and also enables the state
to be saved to `localStorage` without having to directly manage this within this component.

Field data is transmitted during `onBlur` events, and there is also a general full-form auto-save feature that triggers
after a designated period of inactivity since the last user input has been made.
*/

import graphics from "../images/graphics.svg";

// Form will be fully auto-saved this many milliseconds after the last user modification.
const autoSaveFormDelay = 1500;
let autoSaveFormTimeout: number = 0;

// Shown as tooltips and/or error messages if javascript is disabled and we are unable to specify custom validation
// messages instead.
const requirements: { [ key: string ]: string } = {
    subject:    'Subject line cannot be blank or empty',
    body:       'Message cannot be blank or empty',
    address:    'Must be a valid email address, for example: "your.address@example.com"' 
}

const blank: Message = { subject: '', body: '', address: '' };

export function ContactPage() {
    const dispatch      = useDispatch();
    const message       = useSelector(selectAll);
    const historyIndex  = useSelector(selectIndex);

    const [formValues, setFormValues] = React.useState<Message>(message);

    const [severity, setSeverity]       = React.useState<'success' | 'error'>('success');
    const [disabled, setDisabled]       = React.useState(false);
    const [showResult, setShowResult]   = React.useState(false);

    const saveField = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        dispatch({ type: `message/${ name }Update`, payload: value });
    }

    const saveAll = (values: Message) => {
        autoSaveFormTimeout = 0;
        dispatch(update(values));
    }

    const clearForm = () => {
        setFormValues(blank);
        dispatch(clear());
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        // Form Auto-Save:
        // On each change cancel any existing timeout and set a new one. This effectively prevents the auto-save from
        // triggering while user modifications are still being made. In order for auto-save to execute, a period of
        // `autoSaveFormDelay` must pass uninterrupted since the last user input.
        if (autoSaveFormTimeout) clearTimeout(autoSaveFormTimeout);

        // Apply the change
        const { name, value } = event.target;
        const values = { ...formValues, [name]: value };
        setFormValues(values);

        // Set a new timeout with a full delay
        autoSaveFormTimeout = window.setTimeout(() => saveAll(values), autoSaveFormDelay);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setDisabled(true);

        // email.send(
        //     config.serviceID, 
        //     config.templateID, 
        //     formValues
        // ).then(handleSendSuccess, handleSendError);

        return false;
    }

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        // capture reference to present state
        // dispatch clear action
        // reset any invalid states
        // notify user that draft has been discarded
        //      give option to undo via captured reference to present state

        clearForm();
        const form = event.target as HTMLFormElement;
        form.querySelectorAll('.invalid').forEach((element: Element) => {
            element.classList.remove('invalid');
        });

        notify({
            type:       "info",
            message:    "Draft has been discarded.",
            actions: historyIndex ? [{
                name: "Undo", action: ActionCreators.jumpToPast(historyIndex)
            }] : undefined
        });
    }

    const handleSendSuccess = () => {
        setSeverity('success');
        setShowResult(true);
        clearForm();
        setDisabled(false);
    }

    const handleSendError = (_reason: any) => {
        setSeverity('error');
        setShowResult(true);
        setDisabled(false);
    }

    return (
        <Layout>
            <Content>
                <PageHeading>Send <span className="accent">Ernie</span> a message:</PageHeading>
                <br />
                <Email id="email-form" onSubmit={ handleSubmit } onReset={ handleReset }>
                    <Subject required
                        type        = "text"
                        pattern     = ".*\S+.*"
                        title       = { requirements.subject }
                        value       = { formValues.subject }
                        onChange    = { handleChange }
                        onBlur      = { saveField }
                        name        = "subject"
                        placeholder = "Subject" />

                    <Body required multiline
                        title       = { requirements.message }
                        value       = { formValues.body }
                        onChange    = { handleChange }
                        onBlur      = { saveField }
                        rows        = { 5 }
                        name        = "body"
                        placeholder = "Message" />

                    <Address required
                        type        = "email"
                        pattern     = "[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                        title       = { requirements.address }
                        value       = { formValues.address }
                        onChange    = { handleChange }
                        onBlur      = { saveField }
                        name        = "address" 
                        placeholder = "Your email" />
                        
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
    gridArea: 'subject'
});

const Body = styled(TextField)({
    gridArea:   'body',
    resize:     'vertical',
    minHeight:  '10rem'
});

const Address = styled(TextField)({
    gridArea: 'address'
});

const Actions = styled(ButtonGroup)({
    gridArea: 'actions',
    alignSelf: 'center'
});

export default ContactPage;