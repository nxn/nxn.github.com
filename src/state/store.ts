import { configureStore } from '@reduxjs/toolkit'
import draftReducer from './draft';

export default configureStore({
    reducer: {
        draft: draftReducer
    }
});