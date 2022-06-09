interface GenreDTO{
    name: string
}

export interface IComics{
    id: number,
    name: string,
    authorName: string,
    posterPath: string,
    publishYear: number,
    description: string,
    genres: Array<GenreDTO>,
    isReady: boolean
}