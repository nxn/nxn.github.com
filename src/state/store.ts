import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

import messageReducer, { persistenceMiddleware } from './message';
import snackbarReducer, { autoDismissMiddleware } from './snackbar';


export default configureStore({
    reducer: {
        message: messageReducer,
        snackbar: snackbarReducer
    },
    enhancers: [ 
        applyMiddleware(persistenceMiddleware), 
        applyMiddleware(autoDismissMiddleware)
    ]
});