import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from "../types/common.ts";
import type {NumberFactResponse,NumberFactRequest} from "./types.ts";

// Константа для base URL




// Убираем лишнее двоеточие после numbersApi
export const numbersApi = createApi({
    reducerPath: 'numbersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getNumberFact: builder.query<NumberFactResponse, NumberFactRequest>({
            query: ({ number, type, fragment, notfound, min, max }) => {
                const params = new URLSearchParams();

                // Всегда запрашиваем JSON для получения метаданных
                params.append('json', '');

                if (fragment) params.append('fragment', '');
                if (notfound && notfound !== 'default') params.append('notfound', notfound);
                if (min !== undefined && max !== undefined && number === 'random') {
                    params.append('min', min.toString());
                    params.append('max', max.toString());
                }

                return `${number}/${type}?${params.toString()}`;
            },
        }),
    }),
});
export const { useGetNumberFactQuery } = numbersApi;