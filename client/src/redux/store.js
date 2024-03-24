import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import authSlice from "./slices/authSlice";
import { AdminApi } from "./apis/adminApi";


const reduxStore = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
        auth: authSlice
    },

    middleware: mid => [...mid(), AuthApi.middleware, userApi.middleware]

})

export default reduxStore