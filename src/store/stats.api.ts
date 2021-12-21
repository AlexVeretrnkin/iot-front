import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../core/axios-base-query';
import { MeterQueryModel } from '../models/query/meter-query.model';
import { PaginationModel } from '../models/pagination.model';
import { MeterModel } from '../models/meter.model';
import { queryParams } from '../core/query-params';

export const statsApi = createApi({
    baseQuery   : axiosBaseQuery(),
    reducerPath : 'statsApi',
    tagTypes: ['Stats'],
    endpoints   : (build) => ({
        getMeterCount : build.query({
            query : _ => ({ url : `/stats/meterCount`, method : 'get'}),
        }),
        getReceivedReadings : build.query({
            query : _ => ({ url : `/stats/receivedReadings`, method : 'get'}),
        }),
        
       
    }),
});

export const { useGetMeterCountQuery, useGetReceivedReadingsQuery } = statsApi;
