import axios from "axios";
import { IComicsInfo } from "../../../components/createComicsTab";
import { AuthorService } from "../../../services/authorService";
import { AppDispatch } from "../../store";
import {comicsCreationSlice} from "../slices/comicsCreationSlice";
import {comicsSlice} from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";



export const create = (request: IAuthorizedRequst<IComicsInfo>) => (dispatch: AppDispatch) =>{
    dispatch(comicsCreationSlice.actions.creating());
    AuthorService.createComics(request)
    .then(res => {
        dispatch(comicsCreationSlice.actions.createdSuccessfully(res.data));
        dispatch(comicsSlice.actions.createComics(res.data));
    })
    .catch(() =>  dispatch(comicsCreationSlice.actions.createdWithError()))
}