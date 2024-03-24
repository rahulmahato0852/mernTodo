import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AuthApi = createApi({
    reducerPath: "Authapi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BACKEND_URL}/api/v1/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            register: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                transformErrorResponse: err => err.data.message
            }),

            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("auth", JSON.stringify(data.result))
                    return data.result
                },
                transformErrorResponse: err => err.data.message
            }),


            logOut: builder.mutation({
                query: userData => {
                    return {
                        url: "/logOut",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("auth")
                    return data
                }
            }),

        }
    }
})

export const { useRegisterMutation, useLoginMutation, useLogOutMutation } = AuthApi
