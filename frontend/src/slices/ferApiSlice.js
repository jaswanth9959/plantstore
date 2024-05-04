import { FER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const fersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getfers: builder.query({
      query: () => ({
        url: FER_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getferById: builder.query({
      query: (id) => ({
        url: `${FER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createFer: builder.mutation({
      query: (data) => ({
        url: `${FER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fer"],
    }),
    updateFer: builder.mutation({
      query: (data) => ({
        url: `${FER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Fer"],
    }),
    uploadFerImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteFer: builder.mutation({
      query: (ferId) => ({
        url: `${FER_URL}/${ferId}`,
        method: "DELETE",
      }),
      providesTags: ["Fer"],
    }),
  }),
});

export const {
  useGetferByIdQuery,
  useCreateFerMutation,
  useDeleteFerMutation,
  useUpdateFerMutation,
  useUploadFerImageMutation,
  useGetfersQuery,
} = fersApiSlice;
