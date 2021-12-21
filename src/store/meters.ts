import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../core/axios-base-query';
import { MeterQueryModel } from '../models/query/meter-query.model';
import { PaginationModel } from '../models/pagination.model';
import { MeterModel } from '../models/meter.model';

export const metersApi = createApi({
    baseQuery   : axiosBaseQuery(),
    reducerPath : 'metersApi',
    endpoints   : (build) => ({
        getMeters : build.query<PaginationModel<MeterModel>, MeterQueryModel>({ query : (meterQuery) => ({ url : '/meter', method : 'get', params: meterQuery}) }),
//        mutation  : build.mutation({
//            query : () => ({ url : '/meters', method : 'post' }),
//        }),
    }),
});


export const { useGetMetersQuery } = metersApi;
