import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth, LoginDto } from "../types/auth.interface";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    endpoints: (builder) => ({
        login: builder.mutation<IAuth, LoginDto>({
            query(body){
                return {
                    url:`/api/v1/auth`,
                    method: "POST",
                    body
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi;