
    import { createSlice } from "@reduxjs/toolkit";

    interface User{
        profilePicture? : string,
        username : string,
        email : string
    }

    interface UserState {
        currentUser : User | null;
        loading     : boolean,
        error       : boolean | string,
        isActive    : boolean ,
       
    }

    const initialState : UserState = {
        currentUser : null,
        loading     : false,
        error       : false,
        isActive    : false
       
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
                state.isActive = true;
                
            },
            signInFailure:(state,action) => {
                state.loading = false;
                state.error = action.payload;
                state.isActive = false;
            },
            singOut:(state) => {
                state.currentUser = null;
                state.isActive = false;      
            }
        }
    });


    export const { signInStart, signInSuccess , signInFailure, singOut} = userSlice.actions;
    export default userSlice.reducer