    import { createSlice } from "@reduxjs/toolkit";

    interface User{
        profilePicture : string,
        username : string,
        email : string
    }

    interface UserState {
        currentUser : User | null;
        loading     : boolean,
        error       : boolean
    }

    const initialState : UserState = {
        currentUser : null,
        loading     : false,
        error       :  false,
    };

    const userSlice = createSlice({
        name:'user',
        initialState,
        reducers:{
            signInStart:(state) => {
                state.loading = true
            },
            signInSuccess : (state,action) => {
                state.currentUser  = action.payload;
                state.loading = false;
                state.error = false;
            },
            signInFailure:(state,action) => {
                state.loading = false;
                state.error = action.payload;
            }
        }
    });


    export const { signInStart, signInSuccess , signInFailure} = userSlice.actions;
    export default userSlice.reducer