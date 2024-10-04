    import {combineReducers, configureStore} from '@reduxjs/toolkit';
    import userReducer from './user/userSlice'
    import { persistReducer , persistStore } from 'redux-persist';
    import  storage  from 'redux-persist/lib/storage';
    



    const rootReducer = combineReducers({user:userReducer});

    const persistConfig = {
        key : 'root',
        version:1,
        storage,
    }

    const persistReducers = persistReducer(persistConfig,rootReducer)
     
    export const store = configureStore({
        reducer :  persistReducers ,
        
        middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
            serializableCheck:false,
        }),
    });







    export type RootState   = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
    export const persistor  = persistStore(store)