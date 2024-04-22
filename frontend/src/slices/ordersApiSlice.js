import { apiSlice } from "./apiSlice";

import { ORDERS_URL } from "../constants";
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    createCounterOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/counter`,
        method: "POST",
        body: { ...order },
      }),
    }),
    updateOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "PUT",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `${ORDERS_URL}/mine/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useCreateCounterOrderMutation,
} = ordersApiSlice;
