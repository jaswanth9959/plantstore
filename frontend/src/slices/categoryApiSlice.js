import { apiSlice } from "./apiSlice";

import { CATEGORY_URL, FER_URL } from "../constants";
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFer: builder.query({
      query: () => ({
        url: `${FER_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getFer: builder.query({
      query: (ferId) => ({
        url: `${FER_URL}/${ferId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: (catId) => ({
        url: `${CATEGORY_URL}/${catId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.catId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useGetAllFerQuery,
  useGetFerQuery,
} = categoryApiSlice;
