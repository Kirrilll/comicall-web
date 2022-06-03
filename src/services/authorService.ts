import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComics } from "../models/comics/comics";

interface DeletePaylod{
    comicsId: number,
    token: string
}

export const AuthorService = createApi({
    reducerPath: 'authorApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/author/' }),
    tagTypes: ['Comics'],
    endpoints: (builder) => ({
        getComics: builder.query<Array<IComics>, string>({
            query: (token) => ({
                url: 'comics',
                headers:{ 'Authorization': `Bearer ${token}` }
            }),
            providesTags: ['Comics'],
        }),
        deleteComics: builder.mutation<string, DeletePaylod>({
            query: (payload: DeletePaylod) => ({
                method: 'DELETE',
                url: 'delete',
                params: {'comicsId': payload.comicsId},
                headers:{ 'Authorization': `Bearer ${payload.token}` }
            }),
            invalidatesTags: ['Comics']
        })
    })
})

export const {useGetComicsQuery, useDeleteComicsMutation} = AuthorService;