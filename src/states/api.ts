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
    getAlerts: build.query<AlertResponse, Record<string, string | number | undefined>>({
      query: (filtersAndLimit) => {
        // console.log('filters:::', params, limit);
        const queryParams = new URLSearchParams();

        for (const [key, value] of Object.entries(filtersAndLimit)) {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        }

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
