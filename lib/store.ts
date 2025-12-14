import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from './api/categoryApi';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [categoryApi.reducerPath]: categoryApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(categoryApi.middleware),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
