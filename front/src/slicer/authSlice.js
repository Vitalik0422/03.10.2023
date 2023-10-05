import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user: {},
    isAuth: false
}

const authState = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
        userAuth: (state, action)=> {
            state.user = action.payload;
            state.isAuth = true
        }
    }
})

export const {userAuth} = authState.actions;

export default authState.reducer;