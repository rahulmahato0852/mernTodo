import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "Userapi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, credentials: "include" }),
    tagTypes: ["blog"],
    endpoints: (builder) => {
        return {

            getUserBlogs: builder.query({
                query: (id) => {
                    return {
                        url: "/",
                        method: "GET",
                        body: id
                    }
                },
                transformResponse: data => {
                    console.log(data);
                    return data.result
                },
                providesTags: ["blog"]
            }),
            addUserBlogs: builder.mutation({
                query: (blogData) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: blogData
                    }
                },
                transformErrorResponse: err => err.data.message,
                invalidatesTags: ["blog"]
            }),
            deleteUserBlogs: builder.mutation({
                query: (id) => {
                    return {
                        url: `/remove/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["blog"]
            }),


            modifyUserBlogs: builder.mutation({
                query: (userData) => {
                    console.log(userData);
                    return {
                        url: `/modify/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["blog"]
            }),


            getBlogDetail: builder.query({
                query: (userData) => {
                    return {
                        url: `/detail/${userData}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["blog"],
                transformResponse: data => data.result
            }),




        }
    }
})



export const { useGetUserBlogsQuery,
    useGetBlogDetailQuery,
    useAddUserBlogsMutation, useDeleteUserBlogsMutation, useModifyUserBlogsMutation } = userApi
