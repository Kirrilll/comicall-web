import axios from "axios";
import { AppDispatch } from "../../store";
import { comicsCreationSlice } from "../slices/comicsCreationSlice";
import {comicsSlice} from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";

interface GenresResponse{
    comicsId: number,
    genres: Array<string>
}

export const addGenres = (request: IAuthorizedRequst<GenresResponse>) => (dispatch:AppDispatch) => {
    dispatch(comicsCreationSlice.actions.updatingGenres());
    axios({
        method: 'PATCH',
        url: 'http://localhost:8080/api/author/addGenres',
        headers: {'Authorization': `Bearer ${request.token}`},
        data: request.content
    })
    .then(res => {
        dispatch(comicsCreationSlice.actions.updatedGenresSuccessfully(res.data));
        dispatch(comicsSlice.actions.updateComics(res.data));
    })
    
}