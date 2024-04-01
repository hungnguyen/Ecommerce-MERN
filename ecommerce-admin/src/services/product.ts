// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, IProductFileGet, IProductFilePost, IProductPriceGet, IProductPricePost, IProductReviewGet, IProductReviewPost } from '../types/product.interface'
import { getToken } from '../app/utils'

const endpoint = "/api/v1/products";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], void>({
      query: () => endpoint,
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id: id }) => ({ type: 'Products', id } as const)),
              { type: 'Products', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: build.mutation<IProduct, Partial<IProduct>>({
        query(body) {
          return {
            url: endpoint,
            method: 'POST',
            headers: { "x-auth-token": getToken() ?? "" },
            body,
          }
        },
        invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: build.query<IProduct, string>({
      query: (id: string) => `${endpoint}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    updateProduct: build.mutation<IProduct, Partial<IProduct>>({
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
      invalidatesTags: (result, error, { _id: id }) => [{ type: 'Products', id }],
    }),
    deleteProduct: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `${endpoint}/${id}`,
          method: 'DELETE',
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    //Product File
    addProductFile: build.mutation<IProduct, Partial<IProductFilePost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/files`,
          method: "POST",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child,
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    updateProductFile: build.mutation<IProduct, Partial<IProductFilePost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/files/${data.child?._id}`,
          method: "PUT",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    deleteProductFile: build.mutation<{ success: boolean; params: Partial<IProductFileGet>}, Partial<IProductFileGet>>({
      query(params){
        return {
          url: `${endpoint}/${params.parent}/files/${params.child}`,
          method: "DELETE",
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      invalidatesTags: (result, error, params) => [{ type: "Products", id: params.parent }]
    }),

    //Product Price
    addProductPrice: build.mutation<IProduct, Partial<IProductPricePost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/prices`,
          method: "POST",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child,
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    updateProductPrice: build.mutation<IProduct, Partial<IProductPricePost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/prices/${data.child?._id}`,
          method: "PUT",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    deleteProductPrice: build.mutation<{ success: boolean; params: Partial<IProductPriceGet>}, Partial<IProductPriceGet>>({
      query(params){
        return {
          url: `${endpoint}/${params.parent}/prices/${params.child}`,
          method: "DELETE",
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      invalidatesTags: (result, error, params) => [{ type: "Products", id: params.parent }]
    }),

    //Product Review
    addProductReview: build.mutation<IProduct, Partial<IProductReviewPost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/reviews`,
          method: "POST",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child,
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    updateProductReview: build.mutation<IProduct, Partial<IProductReviewPost>>({
      query(data){
        return {
          url: `${endpoint}/${data.parent}/reviews/${data.child?._id}`,
          method: "PUT",
          headers: { "x-auth-token": getToken() ?? "" },
          body: data.child
        }
      },
      invalidatesTags: (result, error, params) => [{ type: 'Products', id: params.parent }],
    }),
    deleteProductReview: build.mutation<{ success: boolean; params: Partial<IProductReviewGet>}, Partial<IProductReviewGet>>({
      query(params){
        return {
          url: `${endpoint}/${params.parent}/reviews/${params.child}`,
          method: "DELETE",
          headers: { "x-auth-token": getToken() ?? "" },
        }
      },
      invalidatesTags: (result, error, params) => [{ type: "Products", id: params.parent }]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useDeleteProductMutation, 
  useUpdateProductMutation, 
  useGetProductQuery,
  useAddProductFileMutation,
  useUpdateProductFileMutation,
  useDeleteProductFileMutation,
  useAddProductPriceMutation,
  useUpdateProductPriceMutation,
  useDeleteProductPriceMutation,
  useAddProductReviewMutation,
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation
} = productApi