import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AdminApi = createApi({
    reducerPath: "Adminapi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BACKEND_URL}/api/v1/admin`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            admingetUsers: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                transformResponse: (data) => {
                    return data.result
                },
                providesTags: ["admin"]
            })

        }
    }
})

export const { useAdmingetUsersQuery } = AdminApi
