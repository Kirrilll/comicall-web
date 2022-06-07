import axios from "axios"
import { AppDispatch } from "../../store"
import {comicsSlice} from "../slices/comicsSlice"
import {deleteComicsSlice} from "../slices/deleteComicsSlice"
import { IAuthorizedRequst } from "./getAllThunk"


export const deleteById = (request: IAuthorizedRequst<number>) => (dispatch: AppDispatch) => {
    dispatch(deleteComicsSlice.actions.deleting());
    axios({
        method: 'DELETE',
        url: 'http://localhost:8080/api/author/delete',
        params: {'comicsId': request.content},
        headers: {'Authorization': `Bearer ${request.token}`}
    })
    .then((res) => {
        dispatch(deleteComicsSlice.actions.deletedSuccessfully());
        dispatch(comicsSlice.actions.deleteComics(request.content))
    })
    .catch(() => {
        dispatch(deleteComicsSlice.actions.deleteError());
    })
}