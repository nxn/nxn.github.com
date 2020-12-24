import { createSlice, Action } from '@reduxjs/toolkit';
import store from './store';

export type SnackbarItemType = "success" | "error" | "info" | "warning";

export interface SnackbarAction {
    name: string,
    action: Action<any>;
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
    "success":  2000,
    "error":    5000,
    "info":     3000,
    "warning":  5000
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
