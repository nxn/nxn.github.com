import { Action, ActionCreator, Middleware, PayloadAction, createSlice } from '@reduxjs/toolkit';
import undoable, { StateWithHistory } from 'redux-undo'

export const MESSAGE_SLICE = 'message';
const LOCAL_STORAGE_PREFIX = `nxn.io:${ MESSAGE_SLICE }`;

export type MessageField = 'subject' | 'body' | 'address';

export const MESSAGE_FIELDS = {
    Subject:    'subject'   as MessageField,
    Body:       'body'      as MessageField,
    Address:    'address'   as MessageField,
}

export interface Message {
    subject:    string,
    body:       string,
    address:    string
};

function getInitialState() {
    try {
        return {
            subject:    localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Subject }`)   || '',
            body:       localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Body }`)      || '',
            address:    localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Subject }`)   || '',
        }
    }
    catch (error) {
        console.error(error);
    }

    return { subject: '', body: '', address: '' };
}

export const messageSlice = createSlice({
    name: MESSAGE_SLICE,
    // Get initial state from localStorage
    initialState: getInitialState(),
    reducers: {
        subjectUpdate: (state: Message, action: { payload: string }) => {
            state.subject = action.payload;
        },
        bodyUpdate: (state: Message, action: { payload: string }) => {
            state.body = action.payload;
        },
        addressUpdate: (state: Message, action: { payload: string }) => {
            state.address = action.payload;
        },
        update: (state: Message, action: { payload: Message }) => {
            state.subject = action.payload.subject;
            state.body = action.payload.body;
            state.address = action.payload.address;
        },
        clear: (state: Message) => {
            state.subject = '';
            state.body = '';
            state.address = '';
        }
    }
});

export const MESSAGE_UNDO = `${ MESSAGE_SLICE }/undo`;
export const MESSAGE_REDO = `${ MESSAGE_SLICE }/redo`;

export const { subjectUpdate, bodyUpdate, addressUpdate, update, clear } = messageSlice.actions;
export const undo: ActionCreator<Action<string>> = () => ({ type: MESSAGE_UNDO });
export const redo: ActionCreator<Action<string>> = () => ({ type: MESSAGE_REDO });
export const fieldUpdate = (field: MessageField, payload: string) => ({ 
    type: `${ MESSAGE_SLICE }/${ field }Update`, 
    payload
});

export const undoableDraft = undoable(messageSlice.reducer, {
    limit: 1,
    undoType: MESSAGE_UNDO,
    redoType: MESSAGE_REDO,
});

export default undoableDraft;

export const selectAll     = ({ message }: { message: StateWithHistory<Message> }) => message.present;
export const selectSubject = ({ message }: { message: StateWithHistory<Message> }) => message.present.subject;
export const selectBody    = ({ message }: { message: StateWithHistory<Message> }) => message.present.body;
export const selectAddress = ({ message }: { message: StateWithHistory<Message> }) => message.present.address;
export const selectIndex   = ({ message }: { message: StateWithHistory<Message> }) => message.index;

export const persistenceMiddleware: Middleware = store => next => (action: PayloadAction<string>) => {
    if (!action.type.startsWith(MESSAGE_SLICE)) {
        return next(action);
    }

    const oldState  = selectAll(store.getState());
    const result    = next(action);
    const newState  = selectAll(store.getState());
    
    const changes = diff(oldState, newState) as { [ key: string ]: string } | null;

    if (!changes) {
        return result;
    }

    for (let key in changes) {
        // save to persistent store asynchronously to not hold anything up
        window.setTimeout(() => {
            try {
                localStorage.setItem(`${ LOCAL_STORAGE_PREFIX }/${ key }`, changes[key]);
            }
            catch (error) { console.error(error); }
        });
    }

    return result;
}

function diff<T>(obj1: T, obj2: T) {
    let result: { [P in keyof T]?: T[P] } | null = null;
    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) {
            if (!result) result = { };
            result[key] = obj2[key]
        }
    }
    return result;
}