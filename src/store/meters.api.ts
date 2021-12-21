import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../core/axios-base-query';
import { MeterQueryModel } from '../models/query/meter-query.model';
import { PaginationModel } from '../models/pagination.model';
import { MeterModel } from '../models/meter.model';

export const metersApi = createApi({
    baseQuery   : axiosBaseQuery(),
    reducerPath : 'metersApi',
    tagTypes: ['Meters'],
    endpoints   : (build) => ({
        getMeters : build.query<PaginationModel<MeterModel>, MeterQueryModel>({
            query : (meterQuery) => ({ url : `/meter`, method : 'get', params: meterQuery }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Meters', id } as const)),
                        { type: 'Meters', id: 'LIST' },
                    ]
                    :
                    [{ type: 'Meters', id: 'LIST' }],
        }),
        removeMeter  : build.mutation<null, string>({
            query : (id) => ({ url : `/meter/${id}`, method : 'delete'}),
            invalidatesTags: (result, error, id) => [{ type: 'Meters', id }],
        }),
        createMeter  : build.mutation<null, MeterModel>({
            query : (meter: MeterModel) => ({ url : `/meter`, method : 'post', data: meter}),
            invalidatesTags: () => [{ type: 'Meters', id: 'LIST' }],
        }),
        updateMeter  : build.mutation<null, MeterModel>({
            query : (meter: MeterModel) => ({ url : `/meter`, method : 'patch', data: meter}),
            invalidatesTags: (result, error, {id}) => [{ type: 'Meters', id }],
        }),
    }),
});

export const { useGetMetersQuery, useRemoveMeterMutation, useUpdateMeterMutation, useCreateMeterMutation } = metersApi;
