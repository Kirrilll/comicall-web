import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthorService, PagesRequest } from "../../../services/authorService";
import { AppDispatch } from "../../store";
import { comicsCreationSlice } from "../slices/comicsCreationSlice";
import { IAuthorizedRequst } from "./getAllThunk";

export const updatePages = createAsyncThunk(
    'updatePages',
    async (request: IAuthorizedRequst<PagesRequest>) => {
        const response = await AuthorService.updatePages(request);
        return response.data;
    }
)