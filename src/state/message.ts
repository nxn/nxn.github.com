import { createSlice } from '@reduxjs/toolkit';
import undoable, { StateWithHistory } from 'redux-undo'

export interface Message {
    subject:    string,
    body:       string,
    address:    string
};

export const messageSlice = createSlice({
    name: 'message',
    // Get initial state from localStorage
    initialState: { subject: '', body: '', address: '' } as Message,
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

// export const { subjectUpdate, messageUpdate, addressUpdate, update, clear } = draftSlice.actions;
// export default draftSlice.reducer;

export const undoableDraft = undoable(messageSlice.reducer, {
    limit: 1,
    undoType: 'message/undo',
    redoType: 'message/redo'
});

export const { subjectUpdate, bodyUpdate, addressUpdate, update, clear } = messageSlice.actions;

export const selectAll     = ({ message }: { message: StateWithHistory<Message> }) => message.present;
export const selectSubject = ({ message }: { message: StateWithHistory<Message> }) => message.present.subject;
export const selectBody    = ({ message }: { message: StateWithHistory<Message> }) => message.present.body;
export const selectAddress = ({ message }: { message: StateWithHistory<Message> }) => message.present.address;
export const selectIndex   = ({ message }: { message: StateWithHistory<Message> }) => message.index;


export default undoableDraft