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
    const { multiline, deferValidation, errors, onInvalid, ...other } = props;
    const Component = multiline ? TextAreaField : TextInputField;
    const errorMessages = {
        ...defaultErrors,
        ...errors
    };

    const fieldRef = React.useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);

    // TODO: The custom validity message displayed by the browser sometimes shows a residual message associated with the
    // prior state rather than the current value of the field. This happens despite `reportValidity()` being called
    // after having set the new message. This is most noticeable when a field becomes valid -- the `.invalid` class is
    // removed as expected, but the browser's (firefox in this case) error pop up remains visible on screen for some
    // reason. This issue might be unavoidable/out of my control.
    const updateValidity = () => {
        if (!fieldRef.current) { return; }

        setCustomValidity(fieldRef.current, errorMessages);
        if (!deferValidation && fieldRef.current.reportValidity()) {
            fieldRef.current.classList.remove('invalid');
        }
    }

    // Needs to execute on each value change to make sure that validity is up to date. Also depends on `deferValidation`
    // and `errorMessages` values. The reason this isn't done via `onInput` or `onChange` events is that these events 
    // only fire as a result of user initiated interactions. However, validity must also be updated whenever the value
    // is changed via other sources, for example redux state changes, form resets, etc.
    React.useEffect(updateValidity, [
        fieldRef.current,
        fieldRef.current && fieldRef.current.value,
        deferValidation,
        ...Object.values(errorMessages)
    ]);

    // Event will fire when a form submition is attempted or if the field's `checkValidity()` or `reportValidity()` 
    // methods are used while the current value is invalid.
    const handleInvalid = (event: React.FormEvent<TextFieldElement>) => {
        if (onInvalid) {
            onInvalid(event);
        }

        if (fieldRef.current) {
            fieldRef.current.classList.add('invalid');
        }
    };

    return (
        <Component 
            ref         = { fieldRef } 
            onInvalid   = { handleInvalid }
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