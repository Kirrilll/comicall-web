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
        for(let i =0; i < request.content.images.length; i++){
            formdata.append('images', request.content.images[i]);
        }

        return await axios.patch(
            'http://localhost:8080/api/author/comics/add',
            formdata,
            { headers: { 'Authorization': `Bearer ${request.token}` } }
        )
    }
}