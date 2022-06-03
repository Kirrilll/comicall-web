

export interface IComics{
    id: number,
    name: string,
    authorName: string,
    posterPath: string,
    publishYear: number,
    description: string,
    genres: Array<string>,
    isRead: boolean
}