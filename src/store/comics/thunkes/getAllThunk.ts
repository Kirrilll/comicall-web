import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IAuthorizedRequst<T> {
    content: T,
    token: string
}


export const getAll = createAsyncThunk(
    'author/comics',
    async (token: string, getAllThunk) => {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8080/api/author/comics',
            headers: {'Authorization': `Bearer ${token}`}
        });
        return response.data;
    }
);