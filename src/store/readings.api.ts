import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../core/axios-base-query';
import { PaginationModel } from '../models/pagination.model';
import { ReadingQueryModel } from '../models/query/reading-query.model';
import { ReadingModel } from '../models/reading.model';

export const readingsApi = createApi({
    baseQuery   : axiosBaseQuery(),
    reducerPath : 'readingsApi',
    tagTypes: ['Readings'],
    endpoints   : (build) => ({
        getReadings : build.query<PaginationModel<ReadingModel>, ReadingQueryModel>({
            query : (readingQuery) => ({ url : `/meter/reading`, method : 'get', params: readingQuery }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Readings', id } as const)),
                        { type: 'Readings', id: 'LIST' },
                    ]
                    :
                    [{ type: 'Readings', id: 'LIST' }],
        }),
        removeReading  : build.mutation<null, string>({
            query : (id) => ({ url : `/meter/reading/${id}`, method : 'delete'}),
            invalidatesTags: (result, error, id) => [{ type: 'Readings', id }],
        }),
        createReading  : build.mutation<null, ReadingModel>({
            query : (meter: ReadingModel) => ({ url : `/meter/reading`, method : 'post', data: meter}),
            invalidatesTags: () => [{ type: 'Readings', id: 'LIST' }],
        }),
    }),
});

export const { useCreateReadingMutation, useGetReadingsQuery, useRemoveReadingMutation } = readingsApi;
