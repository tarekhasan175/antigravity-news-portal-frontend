import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '@/types/news';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    endpoints: builder => ({
        getCategories: builder.query<{ data: Category[] }, void>({
            query: () => '/api/v1/categories',
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
