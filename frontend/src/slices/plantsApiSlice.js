import { PLANTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const plantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: () => ({
        url: PLANTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPlantById: builder.query({
      query: (id) => ({
        url: `${PLANTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlant: builder.mutation({
      query: (data) => ({
        url: `${PLANTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plant"],
    }),
    updatePlant: builder.mutation({
      query: (data) => ({
        url: `${PLANTS_URL}/${data.plantId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Plant"],
    }),
    uploadPlantImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deletePlant: builder.mutation({
      query: (plantId) => ({
        url: `${PLANTS_URL}/${plantId}`,
        method: "DELETE",
      }),
      providesTags: ["Plant"],
    }),
  }),
});

export const {
  useGetPlantsQuery,
  useGetPlantByIdQuery,
  useCreatePlantMutation,
  useUpdatePlantMutation,
  useDeletePlantMutation,
  useUploadPlantImageMutation,
} = plantsApiSlice;
