import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { selectAll } from './message';

function diff<T>(obj1: T, obj2: T) {
    let result: { [P in keyof T]?: T[P] } | null = null;
    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) {
            if (!result) result = { };
            result[key] = obj2[key]
        }
    }
    return result;
}

export const messagePersistence: Middleware = store => next => (action: PayloadAction<string>) => {
    if (!action.type.startsWith('message')) {
        return next(action);
    }

    const oldState  = selectAll(store.getState());
    const result    = next(action);
    const newState  = selectAll(store.getState());
    
    const changes = diff(oldState, newState);

    if (!changes) {
        return result;
    }

    // save to persistent store asynchronously to not hold anything up
    window.setTimeout(() => {
        for (let key in changes) {
            console.log(key, changes[key as keyof typeof changes]);
        }
    });

    return result;
}

export default messagePersistence;