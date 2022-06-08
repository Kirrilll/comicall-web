import axios from "axios"
import { AuthorService } from "../../../services/authorService"
import { AppDispatch } from "../../store"
import {comicsDeleteSlice} from "../slices/comicsDeleteSlice"
import {comicsSlice} from "../slices/comicsSlice"
import { IAuthorizedRequst } from "./getAllThunk"


export const deleteById = (request: IAuthorizedRequst<number>) => (dispatch: AppDispatch) => {
    dispatch(comicsDeleteSlice.actions.deleting());
    AuthorService.deleteComics(request)
    .then((res) => {
        dispatch(comicsDeleteSlice.actions.deletedSuccessfully());
        dispatch(comicsSlice.actions.deleteComics(request.content))
    })
    .catch(() => {
        dispatch(comicsDeleteSlice.actions.deleteError());
    })
}