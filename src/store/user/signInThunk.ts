import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/user/user";
import { UserRequest } from "../../models/user/userRequest";


export const signIn = createAsyncThunk(
    'auth/signing',
    async (user: UserRequest, singInThunk) => {
        try {
            const response = await axios.post<IUser>('http://localhost:8080/api/auth/signing', user);
            return response.data;
        }
        catch (e) {
            return singInThunk.rejectWithValue('Неверный логин или пароль');
        }

    }
);