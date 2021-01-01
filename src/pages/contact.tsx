import React                        from "react";
import styled                       from "@emotion/styled";
import { useDispatch, useSelector } from 'react-redux';

import Layout                   from "../components/layout";
import { PageHeading }          from "../components/common";
import { Button, ButtonGroup }  from "../components/controls/button";
import { TextField }            from "../components/controls/textfield";

import { alert } from "../state/snackbar";
import { 
    selectAll, 
    MESSAGE_FIELDS,
    MessageField, 
    fieldUpdate,
    clear, 
    undo
} from "../state/message";

import {
    SendIcon,
    TrashIcon
} from "../components/graphics";

/* Contact Page
The contact form uses uncontrolled components that, during certain key events, transmit their state to a redux store.
This enables the form to have time travel capability via redux-undo, and also enables the state to be saved to 
`localStorage` without having to directly manage its persistance here (done via redux middleware).

The events that trigger the state to be transmitted to redux are:
    `onBlur`:   field state is saved immediately
    `onInput`:  field state saved only if there is a specified and uninterrupted delay following the last user input.
    `onReset`:  all field states saved immediately
*/

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

    const formRef = React.useRef<HTMLFormElement | null>(null);
    const [autoSave, setAutoSave] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);

    // If set true all error messages will be suppressed until the user attempts to submit an invalid form. At that
    // point `deferValidation` can be disabled to show instant error information as changes are being made. This is 
    // essentially a compromise to prevent displaying errors for inputs that have not yet been fully filled out.
    const [deferValidation, setDeferValidation] = React.useState(true);

    // Determines whether discarding the form contents should be enabled based on whether there's any saved data at the
    // moment.
    const hasDraft = !!message.subject || !!message.body || !!message.address;

    // If `deferValidation` is set to true, this event will only fire when there is an attempt to submit the form.
    // Rather annoyingly, this is the only practical way to detect an attempt to submit the form without disabling
    // the form's client validation entirely (i.e., via the `novalidate` form attribute).
    const handleInvalid = () => {
        if (deferValidation) {
            // Enables instant error reporting
            setDeferValidation(false);
        }
    }

    const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        // Any existing auto-save timer can be cancelled and an immediate save can be performed instead of waiting.
        if (autoSave) {
            window.clearTimeout(autoSave);
            setAutoSave(0);
        }
        const { name, value } = event.target;
        dispatch(fieldUpdate(name as MessageField, value));
    }

    const handleFieldInput = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        
        // Field Auto-Save:
        // On each input cancel any existing timeout and set a new one. This effectively prevents the auto-save from
        // triggering while user modifications are still being made. In order for auto-save to execute, a period of
        // `autoSaveDelay` must pass uninterrupted since the last user input.
        if (autoSave) {
            window.clearTimeout(autoSave);
        }
        setAutoSave(
            window.setTimeout(
                () => dispatch(fieldUpdate(name as MessageField, value)), 
                autoSaveDelay
            )
        );
    }

    const handleFormReset = () => {
        // Any existing autoSave timeout should be cancelled so that it doesn't interfere with the state after the form
        // has been cleared.
        if (autoSave) {
            window.clearTimeout(autoSave);
            setAutoSave(0);
        }

        dispatch(clear());

        setDeferValidation(true);

        if (formRef.current) {
            formRef.current.querySelectorAll('.invalid').forEach((element: Element) => {
                element.classList.remove('invalid');
            });
        }
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setDisabled(true);

        const close = dispatch(alert({
            type:           "working",
            message:        "Sending ...",
            noAutoDismiss:  true,
            undismissable:  true
        })) as unknown as () => void;


        window.setTimeout(() => {
            close();
            handleSendError();
        }, 3000)

        // email.send(
        //     config.serviceID, 
        //     config.templateID, 
        //     formValues
        // ).then(handleSendSuccess, handleSendError);

        return false;
    }

    const handleSendSuccess = () => {
        setDisabled(false);

        dispatch(alert({
            type:       "success",
            message:    "Message delivered!"
        }));
        
        if (formRef.current) {
            formRef.current.reset();
        };
    }

    const handleSendError = () => {
        setDisabled(false);

        dispatch(alert({
            type:           "error",
            title:          "Message could not be delivered",
            message:        "Please verify that you have internet access and try again; a draft of this message has been saved to your device in case you would like to retry at a later time.",
            noAutoDismiss:  true,
            undismissable:  true,
            actions:        [{ name: "Dismiss", dismiss: true }]
        }));
    }

    const showUndoPrompt = () => {
        dispatch(alert({
            type:       "warning",
            message:    "Draft discarded",
            actions:    [{ name: "Undo", dismiss: true, action: undo() }]
        }));
    }

    return (
        <Layout>
            <Content>
                <PageHeading>Send <span className="accent">Ernie</span> a message:</PageHeading>
                <br />
                <Email ref={ formRef } id="email-form" onSubmit={ handleFormSubmit } onReset={ handleFormReset }>
                    <Subject required
                        type            = "text"
                        pattern         = ".*\S+.*"
                        title           = { requirements.subject }
                        name            = { MESSAGE_FIELDS.Subject }
                        defaultValue    = { message.subject }
                        placeholder     = "Subject"
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        onInvalid       = { handleInvalid }
                        disabled        = { disabled }
                        deferValidation = { deferValidation } />

                    <Body required multiline
                        title           = { requirements.message }
                        name            = { MESSAGE_FIELDS.Body }
                        defaultValue    = { message.body }
                        placeholder     = "Message"
                        rows            = { 5 }
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        onInvalid       = { handleInvalid }
                        disabled        = { disabled }
                        deferValidation = { deferValidation } />

                    <Address required
                        type            = "email"
                        pattern         = "[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                        title           = { requirements.address }
                        name            = { MESSAGE_FIELDS.Address }
                        defaultValue    = { message.address }
                        placeholder     = "Your email"
                        onInput         = { handleFieldInput }
                        onBlur          = { handleFieldBlur }
                        onInvalid       = { handleInvalid }
                        disabled        = { disabled }
                        deferValidation = { deferValidation } />
                        
                    <Actions>
                        <Button type="submit" color="primary" disabled={ disabled }>
                            <SendIcon />
                            Send It
                        </Button>
                        <Button type="reset" color="secondary" onClick={ showUndoPrompt } disabled={ disabled || !hasDraft }>
                            <TrashIcon />
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