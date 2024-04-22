import { apiSlice } from "./apiSlice";

import { CATEGORY_URL } from "../constants";
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
} = categoryApiSlice;
