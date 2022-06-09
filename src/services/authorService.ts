import axios from "axios";
import { IAuthorizedRequst } from "../store/comics/thunkes/getAllThunk";
import { GenresResponse } from "../store/comics/thunkes/addGenresThunk";
import { IComicsInfo } from "../components/createComicsTab";
import { IComics } from "../models/comics/comics";

export interface GenreShortResponse {
    name: string
}

export interface PagesRequest {
    comicsId: number,
    images: FileList
}

export interface IUpdatePublish {
    comicsId: number,
    isRead: boolean
}

export interface IUpdateInfo{
    comicsId: number,
    info: IComicsInfo
}

export interface IPage{
    id: number,
    pageNumber: number,
    path: string
}

export class AuthorService {

    static async getAllGenres(token: string) {
        return await axios.get<GenreShortResponse[]>(
            'http://localhost:8080/api/library/genres',
            { headers: { 'Authorization': `Bearer ${token}` } },
        );
    }

    static async updateGenres(request: IAuthorizedRequst<GenresResponse>) {
        return await axios.patch<IComics>(
            'http://localhost:8080/api/author/addGenres',
            request.content,
            { headers: { 'Authorization': `Bearer ${request.token}` } },
        )
    }

    static async createComics(request: IAuthorizedRequst<IComicsInfo>) {
        let formdata = new FormData();
        formdata.append("logo", request.content.logo!);
        formdata.append("name", request.content.name);
        formdata.append("description", request.content.description);
        formdata.append("publishYear", request.content.publishYear!.toString());

        return await axios.post<IComics>(
            'http://localhost:8080/api/author/create',
            formdata,
            { headers: { 'Authorization': `Bearer ${request.token}` } },
        )
    }

    static async deleteComics(request: IAuthorizedRequst<number>) {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/api/author/delete',
            params: { 'comicsId': request.content },
            headers: { 'Authorization': `Bearer ${request.token}` }
        })
    }

    static async updatePages(request: IAuthorizedRequst<PagesRequest>) {

        let formdata = new FormData();
        formdata.append('comicsId', request.content.comicsId.toString());
        for (let i = 0; i < request.content.images.length; i++) {
            formdata.append('images', request.content.images[i]);
        }

        return await axios.patch(
            'http://localhost:8080/api/author/comics/add',
            formdata,
            { headers: { 'Authorization': `Bearer ${request.token}` } }
        )
    }

    static async publishComics(request: IAuthorizedRequst<IUpdatePublish>) {
        return await axios.put(
            'http://localhost:8080/api/author/publish',
            request.content,
            { headers: { 'Authorization': `Bearer ${request.token}` } }
        )
    }

    static async updateComicsInfo(request: IAuthorizedRequst<IUpdateInfo>) {
        let formdata = new FormData();
        if(request.content.info.logo != null && typeof request.content.info.logo !==  'string'){
           formdata.append("logo", request.content.info.logo); 
        }
        formdata.append("name", request.content.info.name);
        formdata.append("description", request.content.info.description);
        formdata.append("publishYear", request.content.info.publishYear!.toString());

        return await axios.put<IComics>(
            `http://localhost:8080/api/author/change/${request.content.comicsId}`,
            formdata,
            {
                headers: { 'Authorization': `Bearer ${request.token}` },
            },
        )
    }

    static async getComicsPage(request: IAuthorizedRequst<number>){
        return await axios.get<IPage[]>(
            `http://localhost:8080/api/author/comics/${request.content}`,
            {
                headers: { 'Authorization': `Bearer ${request.token}` },
            },
        )
    }

}