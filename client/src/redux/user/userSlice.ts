
    import { createSlice } from "@reduxjs/toolkit";

    interface User{
        profilePicture? : string,
        username : string,
        email : string
    }

    interface Admin {
        adminId : string;
        adminActive : boolean;
    }

    interface UserState {
        currentUser : User | null;
        loading     : boolean,
        error       : boolean | string,
        isActive    : boolean ,
        admin       : Admin | null,
       
    }


    const initialState : UserState = {
        currentUser : null,
        loading     : false,
        error       : false,
        isActive    : false,
        admin       : null,
       
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
            },
            adminSingInSuccess : (state , action) => {
                state.admin = {
                    adminId : action.payload.adminId,
                    adminActive : true
                };
                state.loading = false;
                state.error  = false;
            },
            adminSignOut : (state) => {
                state.admin = null;
            }
        }
    });


    export const { signInStart, signInSuccess , signInFailure, singOut} = userSlice.actions;
    export default userSlice.reducer