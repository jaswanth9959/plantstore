import { SER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getsers: builder.query({
      query: () => ({
        url: SER_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getserById: builder.query({
      query: (id) => ({
        url: `${SER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSer: builder.mutation({
      query: (data) => ({
        url: `${SER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ser"],
    }),
    updateSer: builder.mutation({
      query: (data) => ({
        url: `${SER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ser"],
    }),
    uploadSerImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteSer: builder.mutation({
      query: (serId) => ({
        url: `${SER_URL}/${serId}`,
        method: "DELETE",
      }),
      providesTags: ["Ser"],
    }),
  }),
});

export const {
  useGetserByIdQuery,
  useCreateSerMutation,
  useDeleteSerMutation,
  useGetsersQuery,
  useUpdateSerMutation,
  useUploadSerImageMutation,
} = serviceApiSlice;
