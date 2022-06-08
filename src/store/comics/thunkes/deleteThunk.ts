import axios from "axios"
import { AppDispatch } from "../../store"
import {comicsDeleteSlice} from "../slices/comicsDeleteSlice"
import {comicsSlice} from "../slices/comicsSlice"
import { IAuthorizedRequst } from "./getAllThunk"


export const deleteById = (request: IAuthorizedRequst<number>) => (dispatch: AppDispatch) => {
    dispatch(comicsDeleteSlice.actions.deleting());
    axios({
        method: 'DELETE',
        url: 'http://localhost:8080/api/author/delete',
        params: {'comicsId': request.content},
        headers: {'Authorization': `Bearer ${request.token}`}
    })
    .then((res) => {
        dispatch(comicsDeleteSlice.actions.deletedSuccessfully());
        dispatch(comicsSlice.actions.deleteComics(request.content))
    })
    .catch(() => {
        dispatch(comicsDeleteSlice.actions.deleteError());
    })
}