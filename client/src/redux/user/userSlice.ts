    import { createSlice } from "@reduxjs/toolkit";

    interface User{
        profilePicture : string,
        username : string,
        email : string
    }

    interface UserState {
        currentUser : User | null;
        loading     : boolean,
        error       : boolean | string,
        token       : string | null;
    }

    const initialState : UserState = {
        currentUser : null,
        loading     : false,
        error       : false,
        token       : localStorage.getItem("token") || null, 
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
                state.token  = action.payload.token;
                state.loading = false;
                state.error = false;
                localStorage.setItem("token",action.payload.token);
            },
            signInFailure:(state,action) => {
                state.loading = false;
                state.error = action.payload;
            },
            singOut:(state) => {
                state.currentUser = null;
                state.token = null;
                localStorage.removeItem("token")
            }
        }
    });


    export const { signInStart, signInSuccess , signInFailure, singOut} = userSlice.actions;
    export default userSlice.reducer