import { AuthorService, IUpdateInfo } from "../../../services/authorService";
import { AppDispatch } from "../../store";
import {comicsCreationSlice} from "../slices/comicsCreationSlice";
import { comicsSlice } from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";


export const updateInfo = (request: IAuthorizedRequst<IUpdateInfo>) => (dispatch: AppDispatch) => {
    dispatch(comicsCreationSlice.actions.creating());
    AuthorService.updateComicsInfo(request)
    .then(res => {
        dispatch(comicsCreationSlice.actions.createdSuccessfully(res.data));
        dispatch(comicsSlice.actions.updateComics(res.data));
    })
    .catch(() => dispatch(comicsCreationSlice.actions.createdWithError()))
}