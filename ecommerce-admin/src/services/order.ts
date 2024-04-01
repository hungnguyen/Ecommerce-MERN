// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IOrder, IOrderItemGet, IOrderItemPost } from '../types/order.interface'
import { getToken } from '../app/utils'

const tagName = "Orders";
const endpoint = "/api/v1/orders";

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: [tagName],
  endpoints: (build) => ({
    getOrders: build.query<IOrder[], void>({
      query: () => endpoint,
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
    addOrder: build.mutation<IOrder, Partial<IOrder>>({
        query(body) {
          return {
            url: endpoint,
            method: 'POST',
            headers: { "x-auth-token": getToken() ?? "" },
            body,
          }
        },
        invalidatesTags: [{ type: tagName, id: 'LIST' }],
    }),
    getOrder: build.query<IOrder, string>({
      query: (id: string) => `${endpoint}/${id}`,
      providesTags: (result, error, id) => [{ type: tagName, id }],
    }),
    updateOrder: build.mutation<IOrder, Partial<IOrder>>({
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
    deleteOrder: build.mutation<{ success: boolean; id: string }, string>({
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

    //Order Item
    addOrderItem: build.mutation<IOrder, Partial<IOrderItemPost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/items`,
          method: "POST",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child,
        }
      },
      invalidatesTags: (result, error, params) => [{ type: tagName, id: params.parent }],
    }),
    updateOrderItem: build.mutation<IOrder, Partial<IOrderItemPost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/items/${data.child?._id}`,
          method: "PUT",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child
        }
      },
      invalidatesTags: (result, error, params) => [{ type: tagName, id: params.parent }],
    }),
    deleteOrderItem: build.mutation<{ success: boolean; params: Partial<IOrderItemGet>}, Partial<IOrderItemGet>>({
      query(params){
        return {
          url: `${endpoint}/${params.parent}/items/${params.child}`,
          method: "DELETE",
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      invalidatesTags: (result, error, params) => [{ type: tagName, id: params.parent }]
    }),

    
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetOrdersQuery, 
  useAddOrderMutation, 
  useDeleteOrderMutation, 
  useUpdateOrderMutation, 
  useGetOrderQuery,
  useAddOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation
} = orderApi