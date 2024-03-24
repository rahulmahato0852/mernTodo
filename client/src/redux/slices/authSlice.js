import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../apis/authApi";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: { user: JSON.parse(localStorage.getItem("auth")) },

    reducers: {

    },

    extraReducers: builder => {

        builder
            .addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.user = payload
            })
            .addMatcher(AuthApi.endpoints.logOut.matchFulfilled, (state, { payload }) => {
                state.user = null;
            })


    }


})



export default authSlice.reducer