import { configureStore } from '@reduxjs/toolkit'

import draftReducer from './draft';
import snackbarReducer from './snackbar';

export default configureStore({
    reducer: {
        draft: draftReducer,
        snackbar: snackbarReducer
    }
});