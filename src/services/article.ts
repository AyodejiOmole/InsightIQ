import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Summary = {
    summary: string,
}
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi: any = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl:  'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key",  rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query<Summary, { articleUrl: string, length: number }>({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=${length}`
        })
    }),
});

export const { useLazyGetSummaryQuery } = articleApi;