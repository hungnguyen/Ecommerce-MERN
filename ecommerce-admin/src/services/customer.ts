// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ICustomer from '../types/customer.interface';
import { getToken } from '../app/utils'

const endpoint = "/api/v1/customers";
const tagName = "Customers"

// Define a service using a base URL and expected endpoints
export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: [tagName],
  endpoints: (build) => ({
    getCustomers: build.query<ICustomer[], void>({
      query: () => `${endpoint}`,
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id: id }) => ({ type: tagName, id } as const)),
              { type: tagName, id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: tagName, id: 'LIST' }],
    }),
    addCustomer: build.mutation<ICustomer, Partial<ICustomer>>({
        query(body) {
          return {
            url: `${endpoint}`,
            method: 'POST',
            headers: { "x-auth-token": getToken() ?? "" },
            body,
          }
        },
        invalidatesTags: [{ type: tagName, id: 'LIST' }],
    }),
    getCustomer: build.query<ICustomer, string>({
      query: (id: string) => `${endpoint}/${id}`,
      providesTags: (result, error, id) => [{ type: tagName, id }],
    }),
    updateCustomer: build.mutation<ICustomer, Partial<ICustomer>>({
      query(data) {
        const { _id, ...body } = data
        return {
          url: `${endpoint}/${_id}`,
          method: 'PUT',
          headers: { "x-auth-token": getToken() ?? "" },
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { _id: id }) => [{ type: tagName, id }],
    }),
    deleteCustomer: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `${endpoint}/${id}`,
          method: 'DELETE',
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: tagName, id }],
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCustomersQuery, useGetCustomerQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi