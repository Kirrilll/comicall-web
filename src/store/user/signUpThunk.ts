import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserRequest } from "../../models/user/userRequest";

export const signUp = createAsyncThunk(
    'auth/signupAuthor',
    async (user: UserRequest, signUpThunk) =>{ 
        try{
            const response = await axios.post('http://localhost:8080/api/auth/signupAuthor', user);
            return response.data;
        }catch(e){
            signUpThunk.rejectWithValue('Ошибка');
        }
        
    }
)