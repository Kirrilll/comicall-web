import axios from "axios";
import { IAuthorizedRequst } from "../store/comics/thunkes/getAllThunk";
import { GenresResponse } from "../store/comics/thunkes/addGenresThunk";
import { IComicsInfo } from "../components/createComicsTab";

export interface GenreShortResponse {
    name: string
}

export class AuthorService {

    static async getAllGenres(token: string) {
        return await axios.get<GenreShortResponse[]>(
            'http://localhost:8080/api/library/genres',
            { headers: { 'Authorization': `Bearer ${token}` } },
        );
    }

    static async updateGenres(request: IAuthorizedRequst<GenresResponse>) {
        return await axios({
            method: 'PATCH',
            url: 'http://localhost:8080/api/author/addGenres',
            headers: { 'Authorization': `Bearer ${request.token}` },
            data: request.content
        })
    }

    static async createComics(request: IAuthorizedRequst<IComicsInfo>) {
        var formdata = new FormData();
        formdata.append("logo", request.content.logo!);
        formdata.append("name", request.content.name);
        formdata.append("description", request.content.description);
        formdata.append("publishYear", request.content.publishYear!.toString());

        return await axios({
            method: 'POST',
            url: 'http://localhost:8080/api/author/create',
            headers: { 'Authorization': `Bearer ${request.token}` },
            data: formdata
        })
    }

    static async deleteComics(request: IAuthorizedRequst<number>) {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/api/author/delete',
            params: { 'comicsId': request.content },
            headers: { 'Authorization': `Bearer ${request.token}` }
        })
    }
}