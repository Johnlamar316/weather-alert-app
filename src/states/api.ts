import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlertResponse } from 'types/alert';
import { CUSTOM_URL } from 'utils';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: 'api',
  tagTypes: [],
  endpoints: (build) => ({
    getAlerts: build.query<AlertResponse, { params?: Record<string, string>; limit?: number }>({
      query: ({ params, limit }) => {
        const queryParams = new URLSearchParams({
          ...params,
          limit: limit?.toString() ?? '10',
        });

        return {
          url: `${CUSTOM_URL}?${queryParams.toString()}`,
        };
      },
    }),
    getAlertById: build.query({
      query: (id: string) => `${CUSTOM_URL}/${id}`,
    }),
  }),
});

export const { useGetAlertsQuery, useGetAlertByIdQuery } = api;
