import { Action, ActionCreator, Middleware, PayloadAction, createSlice, Store } from '@reduxjs/toolkit';
import undoable, { StateWithHistory } from 'redux-undo'

export const MESSAGE_SLICE = 'message';
export const LOCAL_STORAGE_PREFIX = `nxn.io:${ MESSAGE_SLICE }`;

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

export const messageSlice = createSlice({
    name: MESSAGE_SLICE,
    // Get initial state from localStorage
    initialState: { subject: '', body: '', address: '' },
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
                window.localStorage.setItem(`${ LOCAL_STORAGE_PREFIX }/${ key }`, changes[key]);
            }
            catch (error) { console.error(error); }
        });
    }

    return result;
}

// Function fetches any persisted message data and dispatches it as an update to the store.
// 
// The store itself is created on both the client as well as the server during SSR/SSG compilation. However, since this 
// data is only available to the client, it cannot be used as the `initialState` input of the `messageSlice`; doing so
// would cause disparities during client hydration as the data used to render the page would be different from what the
// client expects. To avoid this issue, the `initialState` is set as empty and this function is expected to be executed 
// once all depended components are ready to receive state updates (currently this is done via Gatsby's 
// `onInitialClientRender` browser API call).
export const loadClientMessageData = (store: Store) => {
    try {
        store.dispatch(update({
            subject:    window.localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Subject }`)   || '',
            body:       window.localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Body }`)      || '',
            address:    window.localStorage.getItem(`${ LOCAL_STORAGE_PREFIX }/${ MESSAGE_FIELDS.Address }`)   || '',
        }));
    }
    catch (error) {
        console.error(error);
    }
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