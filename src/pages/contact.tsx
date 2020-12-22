import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import { PageHeading } from "../components/common";
import { Button, ButtonGroup } from "../components/button";

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

const validate = (values: TFormValues): TFormErrors => {
    let result: TFormErrors = {
        subject: 'Subject is required',
        message: 'Message is required',
        address: 'Address is required'
    }

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
        //setFormValues({ ...formValues, [name]: value.trimStart() });
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('submit');
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

    const handleReset = (_: React.FormEvent<HTMLFormElement>) => {
        setFormValues(blankForm);
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
                <Email onSubmit={ handleSubmit } onReset={ handleReset }>
                    <Subject required
                        pattern     = ".*\S+.*"
                        title       = "Subject line cannot be blank or empty"
                        type        = "text"
                        value       = { formValues.subject }
                        onChange    = { handleChange }
                        name        = "subject"
                        placeholder = "Subject" />

                    <Message required
                        title       = "Message cannot be blank or empty"
                        value       = { formValues.message }
                        onChange    = { handleChange }
                        rows        = { 5 }
                        name        = "message"
                        placeholder = "Message" />

                    <Address required
                        type        = "email"
                        title       = 'Your email address, for example: "your.address@example.com"'
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

const Subject = styled.input(({ theme }) => ({
    gridArea: 'subject',
    ...theme.styles.controls.textbox
}));

const Message = styled.textarea(({ theme }) => ({
    gridArea:   'message',
    resize:     'vertical',
    minHeight:  '10rem',
    ...theme.styles.controls.textbox
}));

const Address = styled.input(({ theme }) => ({
    gridArea: 'address',
    ...theme.styles.controls.textbox
}));

const Actions = styled(ButtonGroup)({
    gridArea: 'actions',
    alignSelf: 'center'
});

export default ContactPage;