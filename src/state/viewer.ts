import { createSlice } from '@reduxjs/toolkit';
import { getFilename } from "../util";

const VIEWER_SLICE = 'viewer';

export interface ViewerState {
    open: ImageInfo | null;
}

export interface ImageInfo {
    image: string,
    title?: string
}

export const viewerSlice = createSlice({
    name: VIEWER_SLICE,
    initialState: { open: null },
    reducers: {
        open: {
            reducer: (state: ViewerState, action: { payload: ImageInfo }) => {
                state.open = action.payload;
            },
            prepare: (image: ImageInfo) => {
                let payload = { ...image };

                if (!payload.title) {
                    payload.title = getFilename(payload.image) || "Unknown Image";
                }

                return { payload }
            }
        },
        close: (state: ViewerState) => {
            state.open = null;
        }
    }
});

export const { open, close } = viewerSlice.actions;

export const selectAll      = ({ viewer }: { viewer: ViewerState }) => viewer;
export const selectImage    = ({ viewer }: { viewer: ViewerState }) => viewer.open;

export default viewerSlice.reducer;