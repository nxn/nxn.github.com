import { configureStore, applyMiddleware } from '@reduxjs/toolkit'

import messageReducer, { persistenceMiddleware } from './message';
import snackbarReducer, { autoDismissMiddleware } from './snackbar';
import viewerReducer from './viewer';


export default configureStore({
    reducer: {
        message:    messageReducer,
        snackbar:   snackbarReducer,
        viewer:     viewerReducer
    },
    enhancers: [ 
        applyMiddleware(persistenceMiddleware), 
        applyMiddleware(autoDismissMiddleware)
    ]
});