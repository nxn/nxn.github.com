import { createSlice } from '@reduxjs/toolkit';

export interface Draft {
    subject?: string,
    message?: string,
    address?: string
};

export const draftSlice = createSlice({
    name: 'draft',
    initialState: { },
    reducers: {
        updateSubject: (state: Draft, action) => {
            state.subject = action.payload
        },
        updateMessage: (state: Draft, action) => {
            state.message = action.payload
        },
        updateAddress: (state: Draft, action) => {
            state.address = action.payload
        }
    }
});

export const selectSubject = (state: Draft) => state.subject;
export const selectMessage = (state: Draft) => state.message;
export const selectAddress = (state: Draft) => state.address;

export const { updateSubject, updateMessage, updateAddress } = draftSlice.actions;
export default draftSlice.reducer;