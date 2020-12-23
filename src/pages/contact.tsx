import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import { PageHeading } from "../components/common";
import { Button, ButtonGroup } from "../components/button";
import { TextField } from "../components/textfield";

import graphics from "../images/graphics.svg";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const emptyRegex = /^[\s]*$/;

type TFormValues = {
    subject: string,
    message: string,
    address: string
}

type TFormErrors = {
    subject?: string,
    message?: string,
    address?: string
}

const requirements: { [ key: string ]: string } = {
    subject: 'Subject line cannot be blank or empty',
    message: 'Message cannot be blank or empty',
    address: 'Must be a valid email address, for example: "your.address@example.com"' 
}

const validate = (values: TFormValues): TFormErrors => {
    let result: TFormErrors = { ... requirements };

    if (!values) { return result; }

    if (values.subject && !emptyRegex.test(values.subject)) {
        delete result.subject;
    }

    if (values.message && !emptyRegex.test(values.message)) {
        delete result.message;
    }

    if (values.address && !emptyRegex.test(values.address)) {
        if (emailRegex.test(values.address)) {
            delete result.address
        }
        else {
            result.address = "Invalid email format"
        }
    }

    return result;
}

export function ContactPage() {
    const blankForm: TFormValues = { subject: '', message: '', address: '' };

    const [formValues, setFormValues] = React.useState<TFormValues>(blankForm);
    const [formErrors, setFormErrors] = React.useState<TFormErrors>({});

    const [severity, setSeverity]       = React.useState<'success' | 'error'>('success');
    const [disabled, setDisabled]       = React.useState(false);
    const [showResult, setShowResult]   = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setDisabled(true);

            // email.send(
            //     config.serviceID, 
            //     config.templateID, 
            //     formValues
            // ).then(handleSendSuccess, handleSendError);
        }

        return false;
    }

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        setFormValues(blankForm);

        const form = event.target as HTMLFormElement;
        form.querySelectorAll('.invalid').forEach((element: Element) => {
            element.classList.remove('invalid');
        });
    }

    const handleSendSuccess = () => {
        setSeverity('success');
        setShowResult(true);
        setFormValues(blankForm);
        setDisabled(false);
    }

    const handleSendError = (_reason: any) => {
        setSeverity('error');
        setShowResult(true);
        setDisabled(false);
    }

    const handleAlertClose = () => setShowResult(false);

    return (
        <Layout>
            <Content>
                <PageHeading>Send <span className="accent">Ernie</span> a message:</PageHeading>
                <br />
                <Email id="email-form" onSubmit={ handleSubmit } onReset={ handleReset }>
                    <Subject required
                        pattern     = ".*\S+.*"
                        title       = { requirements.subject }
                        type        = "text"
                        value       = { formValues.subject }
                        onChange    = { handleChange }
                        name        = "subject"
                        placeholder = "Subject" />

                    <Message required multiline
                        title       = { requirements.message }
                        value       = { formValues.message }
                        onChange    = { handleChange }
                        rows        = { 5 }
                        name        = "message"
                        placeholder = "Message" />

                    <Address required
                        type        = "email"
                        title       = { requirements.address }
                        pattern     = "[^\s@]+@[^\s@]+\.[^\s@]{2,}"
                        value       = { formValues.address }
                        onChange    = { handleChange }
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
        "message"
        "address"
        "spacer"
        "actions"
    `,

    '@media (min-width: 41.5rem)': {
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: '1fr auto 1fr',
        gridTemplateAreas: `
            "subject subject"
            "message message"
            "address actions"
        `,
    }
});

const Subject = styled(TextField)({
    gridArea: 'subject'
});

const Message = styled(TextField)({
    gridArea:   'message',
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