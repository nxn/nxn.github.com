import { createSlice } from '@reduxjs/toolkit';
import undoable, { StateWithHistory } from 'redux-undo'

export interface Message {
    subject:    string,
    body:       string,
    address:    string
};

const messageSlice = createSlice({
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

const undoableDraft = undoable(messageSlice.reducer, {
    limit: 10
});

export const { subjectUpdate, bodyUpdate, addressUpdate, update, clear } = messageSlice.actions;

export const selectAll     = (state: { message: StateWithHistory<Message> }) => state.message.present;
export const selectSubject = (state: { message: StateWithHistory<Message> }) => state.message.present.subject;
export const selectBody    = (state: { message: StateWithHistory<Message> }) => state.message.present.body;
export const selectAddress = (state: { message: StateWithHistory<Message> }) => state.message.present.address;
export const selectIndex   = (state: { message: StateWithHistory<Message> }) => state.message.index;


export default undoableDraft