import React from "react";
import styled from "@emotion/styled";

import { template } from '../util';

// Discriminated union based on `multiline` prop; if it is true the component will render a textarea, otherwise an input 
// element will be used.
export type TextAreaFieldProps = { multiline: true } &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export type TextInputFieldProps = { multiline?: false } &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

/*
valid
customError

badInput
patternMismatch
rangeOverflow
rangeUnderflow
stepMismatch
tooLong
tooShort
typeMismatch
valueMissing
*/
const defaultErrors = {
    valueMissing:       template`This field cannot be blank or empty`,
    tooLong:            template`This value is too long, maximum length: ${ 'maxLength' }`,
    tooShort:           template`This value is too short, minimum length: ${ 'minLength' }`,
    rangeOverflow:      template`This value is too large, maximum size: ${ 'max' }`,
    rangeUnderflow:     template`This value is too small, minimum size: ${ 'min' }`,
    badInput:           template`This value cannot be converted to a ${ 'type' }`,
    typeMismatch:       template`This value is not a valid ${ 'type' } address`,
    stepMismatch:       template`This value must be in increments of ${ 'step' }`,
    patternMismatch:    template`${ 'title' }`,
}

export type TextFieldProps = (TextAreaFieldProps | TextInputFieldProps) & {
    errors?: { [ P in keyof typeof defaultErrors ]: typeof defaultErrors[P] }
};

export function TextField(props: TextFieldProps) {
    const errors = {
        ...defaultErrors,
        ...props.errors
    };

    // Function determines which error message, if any, should be shown once a form submition is attempted. It is
    // important to note that this function should not cause any error messages or error styles to be shown prior to
    // that point. In order to achieve this, `element.checkValidity()` should NOT be used as it can trigger an `invalid`
    // event to be fired and this would subsequently modify the field's style to reflect an error.
    
    // Furthermore, the `element.checkValidity()` function also considers empty strings to be valid inputs for 
    // `required` fields, which is unwanted behavior.
    const setValidity = (event: React.ChangeEvent<HTMLTextAreaElement> & React.ChangeEvent<HTMLInputElement>) => {
        const element = event.target;

        let error = null;
        const type = (element.type || '').toLowerCase();

        // Treat empty and blank strings as missing
        if (element.required && (element.validity.valueMissing || element.value.trim() === '')) {
            error = errors.valueMissing(element);
        }
        else if (element.pattern && element.validity.patternMismatch) {
            error = errors.patternMismatch(element);
        }
        else if (element.maxLength && element.validity.tooLong) {
            error = errors.tooLong(element);
        }
        else if (element.minLength && element.validity.tooShort) {
            error = errors.tooShort(element);
        }
        else if (element.max && element.validity.rangeOverflow) {
            error = errors.rangeOverflow(element);
        }
        else if (element.min && element.validity.rangeUnderflow) {
            error = errors.rangeUnderflow(element);
        }
        else if (element.step && element.validity.stepMismatch) {
            error = errors.stepMismatch(element);
        }
        else if ((type === 'email' || type === 'url') && element.validity.typeMismatch) {
            error = errors.typeMismatch(element);
        }
        else if (element.validity.badInput) {
            error = errors.badInput(element);
        }

        if (error) {
            element.setCustomValidity(error);
        }
        else {
            // If all of the above passed the field value should be considered valid; any existing error message or
            // style should be removed to signal that there is no further problem with this field.
            element.classList.remove('invalid');
            element.setCustomValidity("");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> & React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event);
        }
        setValidity(event);
    }

    // Event will fire when a form submition is attempted or if the field's `checkValidity()` method is called and the
    // current value is determined to be invalid.
    const handleInvalid = (event: React.ChangeEvent<HTMLTextAreaElement> & React.ChangeEvent<HTMLInputElement>) => {
        if (props.onInvalid) {
            props.onInvalid(event);
        }
        event.target.classList.add('invalid');
    }

    switch (props.multiline) {
        case true: {
            const { multiline, onInvalid, onChange, ...other } = props;
            return <TextAreaField onInvalid={ handleInvalid } onChange={ handleChange } { ...other } />;
        }
        default: {
            const { multiline, onInvalid, onChange, ...other } = props;
            return <TextInputField onInvalid={ handleInvalid }onChange={ handleChange } { ...other } />
        }
    }
}

const TextInputField    = styled.input(({theme}) => theme.styles.controls.textbox);
const TextAreaField     = styled.textarea(({theme}) => theme.styles.controls.textbox);

export default TextField;