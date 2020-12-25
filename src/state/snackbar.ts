import { createSlice, Action } from '@reduxjs/toolkit';
import store from './store';

export type SnackbarItemType = "success" | "error" | "info" | "warning";

export interface SnackbarAction {
    name:       string;
    action:     Action<any>;
    /// If true executing the action will also dismiss the snackbar item
    dismiss?:   boolean;
}

export interface SnackbarItem {
    id:             number;
    timeout?:       number;
    message:        string;
    type:           SnackbarItemType;
    actions?:       SnackbarAction[];
    undismissable?: boolean;
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: [] as SnackbarItem[],
    reducers: {
        push: (state, action: { payload: SnackbarItem }) => {
            state.push(action.payload);
        },
        remove: (state, action: { payload: number }) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index >= 0) {
                state.splice(index, 1);
            }
        }
    }
});

export const selectAll = (state: { snackbar: SnackbarItem[] }) => { return state.snackbar; }

export default snackbarSlice.reducer;

const { push, remove } = snackbarSlice.actions;

const defaultDurationMap: { [ P in SnackbarItemType ]: number } = {
    "success":  3000,
    "error":    10000,
    "info":     5000,
    "warning":  10000
}

export type AlertData = {
    message:            string;
    type?:              SnackbarItemType;
    actions?:           SnackbarAction[];
    undismissable?:     boolean;
    duration?:          number;
}

export const notify = (alert: AlertData) => {
    let { duration, ...payload } = alert;

    if (!payload.type) {
        payload.type = 'info';
    }

    if (!duration) {
        duration = defaultDurationMap[payload.type];
    }

    const id = Date.now();

    store.dispatch(
        push({ id, timeout: window.setTimeout(() => dismiss(id), duration), ...payload } as SnackbarItem)
    );

    return id;
};

export const dismiss = (id: number) => {
    store.dispatch(remove(id));
}
