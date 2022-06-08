import { IComics } from "../models/comics/comics";
import { IComicsResponse } from "../models/comics/comicsResponce";
import { IUser } from "../models/user/user";

export class ComicsMapper{
    static toResponse(comics: IComics):IComicsResponse{
        return ({
            id: comics.id,
            name: comics.name,
            posterPath: comics.posterPath,
            publishYear: comics.publishYear,
            description: comics.description,
            genres: comics.genres.map(genre => genre.genre),
            isRead: comics.isReady,
            authorName: ''
        });
    } 
}