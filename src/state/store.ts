import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

import messageReducer from './message';
import snackbarReducer from './snackbar';

import messagePersistence from './persistence';

export default configureStore({
    reducer: {
        message: messageReducer,
        snackbar: snackbarReducer
    },
    enhancers: [ applyMiddleware(messagePersistence) ]
});