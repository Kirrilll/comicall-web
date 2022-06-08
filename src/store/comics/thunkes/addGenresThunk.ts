import axios from "axios";
import { AuthorService } from "../../../services/authorService";
import { AppDispatch } from "../../store";
import { comicsCreationSlice } from "../slices/comicsCreationSlice";
import {comicsSlice} from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";

export interface GenresResponse{
    comicsId: number,
    genres: Array<string>
}

export const addGenres = (request: IAuthorizedRequst<GenresResponse>) => (dispatch:AppDispatch) => {
    dispatch(comicsCreationSlice.actions.updatingGenres());
    AuthorService.updateGenres(request)
    .then(res => {
        dispatch(comicsCreationSlice.actions.updatedGenresSuccessfully(res.data));
        dispatch(comicsSlice.actions.updateComics(res.data));
    })
    
}