import React  from "react";
import styled from "@emotion/styled";

import { template } from '../../util';

type HTMLInputProps     = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type HTMLTextAreaProps  = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

// TODO: Unfortunately, if the `multiline` prop is optional and omitted the type system accepts props from both. It
// only works as intended if a false value is provided explicitly.
export type TextInputFieldProps = { multiline?: false } & HTMLInputProps;
export type TextAreaFieldProps  = { multiline: true }   & HTMLTextAreaProps;

type TextFieldElement = HTMLInputElement & HTMLTextAreaElement;

/* Exhaustive list of validity states that should indicate an invalid field state:
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

type Errors = typeof defaultErrors;

export type TextFieldProps = (TextInputFieldProps | TextAreaFieldProps) & {
    errors?: { [ P in keyof Errors ]?: Errors[P] },
    deferValidation?: boolean
};

export function TextField(props: TextFieldProps): JSX.Element {
    const { multiline, deferValidation, errors, onInvalid, onInput, ...other } = props;
    const Component = multiline ? TextAreaField : TextInputField;
    const errorMessages = {
        ...defaultErrors,
        ...errors
    };

    // Event will fire when a form submition is attempted or if the field's `checkValidity()` or `reportValidity()` 
    // methods are used while the current value is invalid.
    const handleInvalid = (event: React.FormEvent<TextFieldElement>) => {
        if (onInvalid) {
            onInvalid(event);
        }

        (event.target as TextFieldElement).classList.add('invalid');
    };

    // TODO: The custom validity message displayed by the browser sometimes shows a residual message associated with the
    // prior state rather than the current value of the field. This happens despite `reportValidity()` being called
    // after having set the new message. This is most noticeable when a field becomes valid -- the `.invalid` class is
    // removed as expected, but the browser's (firefox in this case) error pop up remains visible on screen for some
    // reason.
    const handleInput = (event: React.FormEvent<TextFieldElement>) => {
        if (onInput) {
            onInput(event);
        }

        const target = event.target as TextFieldElement;
        setCustomValidity(target, errorMessages);
        if (!deferValidation && target.reportValidity()) {
            target.classList.remove('invalid');
        }
    };

    // After being created, the DOM element should have its custom validation message set. Otherwise, submitting the 
    // form before any changes have been made to the field will still show a default browser-supplied error message.
    //
    // TODO: The default browser messages still show up after the form has been cleared or reset. Since the textfield is
    // meant to work as an uncontrolled component, and since a reset event occurs on the parent form and not the child 
    // fields, it's actually somewhat tricky to identify when this event happens. Solutions that necessitate the parent
    // form manually having to communicate this event via props or other similar means are too clunky.
    const initCustomValidity = React.useCallback((node: TextFieldElement | null) => {
        if (node) {
            setCustomValidity(node, errorMessages);
        }
    }, Object.values(errorMessages));

    return (
        <Component 
            ref         = { initCustomValidity } 
            onInvalid   = { handleInvalid } 
            onInput     = { handleInput } 
            { ...other as HTMLInputProps & HTMLTextAreaProps } />
    );
}

// Function determines which error message, if any, should be shown once a form submition is attempted. It is
// important to note that this function should not cause any error messages or error styles to be shown prior to
// that point. In order to achieve this, `element.checkValidity()` should NOT be used as it can trigger an `invalid`
// event to be fired and this would subsequently modify the field's style to reflect an error.

// Furthermore, the `element.checkValidity()` function also considers empty strings to be valid inputs for 
// `required` fields, which is unwanted behavior.
function setCustomValidity(element: TextFieldElement, errors: Errors) {
    let error = "";
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

    element.setCustomValidity(error);
};

const TextInputField    = styled.input(({theme}) => theme.styles.controls.textbox);
const TextAreaField     = styled.textarea(({theme}) => theme.styles.controls.textbox);

export default TextField;