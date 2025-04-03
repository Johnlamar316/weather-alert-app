import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),
  reducerPath: 'api',
  tagTypes: [],
  endpoints: (build) => ({
    getAlerts: build.query({
      query: (params) => ({
        url: `alerts`,
        params,
      }),
    }),
    getAlertById: build.query({
      query: (id: string) => `alerts/${id}`,
    }),
  }),
});

export const { useGetAlertsQuery, useGetAlertByIdQuery } = api;
