    import {combineReducers, configureStore} from '@reduxjs/toolkit';
    import userReducer from './user/userSlice'
   

    const rootReducer = combineReducers({user:userReducer});

    export const store = configureStore({
        reducer :  rootReducer ,
        
        middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
            serializableCheck:false,
        }),
    });




    export type RootState   = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch