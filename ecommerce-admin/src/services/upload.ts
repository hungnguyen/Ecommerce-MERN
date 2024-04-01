import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../app/utils";
import { IUploadResult } from "../types/upload.interface";

export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ["Upload"],
    endpoints: (build) => ({
        uploadFile: build.mutation<IUploadResult, FormData>({
            query(body){
                return {
                    url: `/api/v1/upload`,
                    method: 'POST',
                    headers: { "x-auth-token": getToken() ?? "" },
                    body,
                    formData: true,
                }
            }
        })
    })
})

export const {useUploadFileMutation} = uploadApi;