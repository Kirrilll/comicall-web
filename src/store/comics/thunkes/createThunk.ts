import axios from "axios";
import { IComicsInfo } from "../../../components/createComicsTab";
import { AppDispatch } from "../../store";
import {comicsCreationSlice} from "../slices/comicsCreationSlice";
import {comicsSlice} from "../slices/comicsSlice";
import { IAuthorizedRequst } from "./getAllThunk";



export const create = (request: IAuthorizedRequst<IComicsInfo>) => (dispatch: AppDispatch) =>{

    var formdata = new FormData();
    formdata.append("logo", request.content.logo!);
    formdata.append("name", request.content.name);
    formdata.append("description", request.content.description);
    formdata.append("publishYear", request.content.publishYear!.toString());

    dispatch(comicsCreationSlice.actions.creating());
    axios({
        method: 'POST',
        url: 'http://localhost:8080/api/author/create',
        headers: { 'Authorization': `Bearer ${request.token}` },
        data: formdata
    })
    .then(res => {
        dispatch(comicsCreationSlice.actions.createdSuccessfully(res.data));
        dispatch(comicsSlice.actions.createComics(res.data));
    })
}