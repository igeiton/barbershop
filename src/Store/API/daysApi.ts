import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const daysApi = createApi({
    reducerPath: 'daysApi',

    tagTypes: ['Users'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://666943c52e964a6dfed45ef0.mockapi.io/api/v1',
    }),

    endpoints: (build) => ({
        getDays: build.query({
            query: () => 'days',

            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }: any) => ({
                              type: 'Users',
                              id,
                          })),
                          { type: 'Users', id: 'LIST' },
                      ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),

        getDay: build.query({
            query: (day) => `${day}`,
        }),

        createDay: build.mutation({
            query: (body) => ({
                url: '/days',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),

        createRecord: build.mutation({
            query: ({ body, dayID }) => ({
                url: `/days/${dayID}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),

        deleteDays: build.mutation({
            query: (dayID) => ({
                url: `/days/${dayID}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetDaysQuery,
    useGetDayQuery,
    useCreateDayMutation,
    useCreateRecordMutation,
    useDeleteDaysMutation,
} = daysApi;

export default daysApi.reducer;
