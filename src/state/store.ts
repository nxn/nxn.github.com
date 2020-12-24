import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './message';
import snackbarReducer from './snackbar';

export default configureStore({
    reducer: {
        message: messageReducer,
        snackbar: snackbarReducer
    }
});