export interface Page {
    id: number;
    pageNumber: number;
    path: string;
    notes: string[];
}

export interface Genre {
    id: number;
    genre: string;
}

export interface IComics {
    id: number;
    name: string;
    description: string;
    publishYear: number;
    posterPath: string;
    pages: Page[];
    genres: Genre[];
    isReady: boolean;
}