import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { IUser } from '../models/user/user';
import { UserRequest } from '../models/user/userRequest';


export const AuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/auth/'}),
    endpoints: (builder) => ({
        signUp: builder.mutation<IUser, UserRequest>({
            query: (user: UserRequest) => ({
                url: 'signupAuthor',
                method: 'POST',
                body: user
            })
        }),
        signing: builder.mutation<IUser, UserRequest>({
            query: (user)  => ({
                url: 'signing',
                method: 'POST',
                body: user
            })
        })
    })
})

export const { useSignUpMutation, useSigningMutation } = AuthApi;
