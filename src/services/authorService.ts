import axios from "axios";


export interface GenreResponse {
    name: string
}

export class AuthorService{

    static async getAllGenres(token: string) {
        return await axios.get<GenreResponse[]>(
            'http://localhost:8080/api/library/genres',
            {headers: {'Authorization': `Bearer ${token}`}},
        );
    } 

}