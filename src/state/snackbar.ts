import { createSlice, Middleware, PayloadAction, Action } from '@reduxjs/toolkit';
import store from './store';

export const SNACKBAR_SLICE = 'snackbar';

export type SnackbarItemType = "success" | "error" | "info" | "warning";

export const DEFAULT_DURATION_MAP: { [ P in SnackbarItemType ]: number } = {
    "success":  3000,
    "error":    10000,
    "info":     5000,
    "warning":  10000
}

export interface SnackbarAction {
    name:       string;
    action:     Action<any>;
    /// If true executing the action will also dismiss the snackbar item
    dismiss?:   boolean;
}

export interface SnackbarItem {
    id:             number;
    type:           SnackbarItemType;
    message:        string;
    duration:       number;
    actions?:       SnackbarAction[];
    timeout?:       number;
    undismissable?: boolean;
}

export type AlertData = {
    message:            string;
    type?:              SnackbarItemType;
    actions?:           SnackbarAction[];
    undismissable?:     boolean;
    duration?:          number;
}

export const snackbarSlice = createSlice({
    name: SNACKBAR_SLICE,
    initialState: [] as SnackbarItem[],
    reducers: {
        alert: {
            reducer: (state, action: { payload: SnackbarItem }) => {
                state.push(action.payload);
            },
            prepare: (alert: AlertData) => {
                let { ...payload } = alert;

                if (!payload.type) { 
                    payload.type = 'info';
                }

                if (!payload.duration) {
                    payload.duration = DEFAULT_DURATION_MAP[payload.type];
                }

                return { 
                    payload: { id: Date.now(), ...payload } as SnackbarItem
                }
            }
        },
        dismiss: (state, action: { payload: number }) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index >= 0) {
                state.splice(index, 1);
            }
        },
        timeoutUpdate: (state, action: { payload: { id: number, value: number } }) => {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.timeout = action.payload.value;
            }
        }
    }
});

export const selectAll = ({ snackbar }: { snackbar: SnackbarItem[] }) => { return snackbar; }
export const selectItemById = ({ snackbar }: { snackbar: SnackbarItem[] }, id: number) => { 
    return snackbar.find((item) => item.id === id); 
}

export const { alert, dismiss, timeoutUpdate } = snackbarSlice.actions;

export default snackbarSlice.reducer;



export const autoDismissMiddleware: Middleware = store => next => (action: PayloadAction<SnackbarItem | number>) => {
    if (!action.type.startsWith(SNACKBAR_SLICE)) {
        return next(action);
    }

    if (action.type.endsWith('/alert')) {
        const item = action.payload as SnackbarItem;
        item.timeout = window.setTimeout(() => store.dispatch(dismiss(item.id)), item.duration);
        next(action);

        return function cancel() {
            window.clearTimeout(item.timeout);
            store.dispatch(timeoutUpdate({ id: item.id, value: 0 }));
        }
    }

    if (action.type.endsWith('/dismiss')) {
        const id = action.payload as number;
        const item = selectItemById(store.getState(), id);
        if (item && item.timeout) {
            window.clearTimeout(item.timeout);
        }
        return next(action);
    }

    return next(action);
}