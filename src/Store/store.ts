import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import { useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './authReducer';
import { daysApi } from './API/daysApi';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    [daysApi.reducerPath]: daysApi.reducer,
    // other reducers
});

const persistConfig = {
    key: 'root',
    storage: storage,
    // whitelist: ['_nameOfSlice_'],
    // blacklist: ['_nameOfSlice_'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(daysApi.middleware),
});

export const persistor = persistStore(store);

// for TypeScript
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
