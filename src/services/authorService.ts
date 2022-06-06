import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComics } from "../models/comics/comics";
import { ComicsStepInfoRequest } from "../models/comics/comicsInfornation";

interface DeletePaylod {
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
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            providesTags: ['Comics'],
        }),
        deleteComics: builder.mutation<string, DeletePaylod>({
            query: (payload: DeletePaylod) => ({
                method: 'DELETE',
                url: 'delete',
                params: { 'comicsId': payload.comicsId },
                headers: { 'Authorization': `Bearer ${payload.token}` }
            }),
            invalidatesTags: ['Comics']
        }),

        //Заменить на обычную санку
        createComicsStep1: builder.mutation<IComics, ComicsStepInfoRequest>({
            query: (data) => ({
                method: 'POST',
                url: 'create',
                headers: { 'Authorization': `Bearer ${data.token}` },
                body: {
                    name: data.name,
                    description: data.description,
                    publishYear: data.description,
                    logo: data.logo,
                }
            }),
            invalidatesTags: ['Comics']
        })
    })
})

export const {
    useGetComicsQuery,
    useDeleteComicsMutation,
    useCreateComicsStep1Mutation 
} = AuthorService;