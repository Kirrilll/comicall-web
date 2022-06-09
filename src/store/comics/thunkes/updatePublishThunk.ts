import { AuthorService, IUpdatePublish } from "../../../services/authorService";
import { AppDispatch } from "../../store";
import {comicsCreationSlice} from "../slices/comicsCreationSlice";
import { comicsSlice } from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";


export const updatePublish = (request: IAuthorizedRequst<IUpdatePublish>) => (dispath: AppDispatch)=>{
    dispath(comicsCreationSlice.actions.updatingPublishStatus());
    AuthorService.publishComics(request)
    .then(res => {
        dispath(comicsCreationSlice.actions.updatedPublishStatus())
        dispath(comicsSlice.actions.updateComics(res.data))
    })
}