import React from "react";
import { useState } from "react";
import { setupStore } from "../store/store";
import ComicsStepper from "./stepper/comicsStepper";


interface IInfo{
    name: string,
    description: string,
    logo: File | null,
    publishYear: number | null
}

interface IComicsCreation {
    information: IInfo,
    togleInfoForm: (name: string, value: string | File | null| number) => void
    genres: Array<string>,
    togleGenres: (genres: Array<string>) => void,
    pages: FileList | null,
    toglePages: ( pages: FileList | null ) => void
}
  
export const ComicsCreationContext = React.createContext<IComicsCreation | null>(null);

const initialInfo: IInfo = {
    name: '',
    description: '',
    logo: null,
    publishYear: null
}


const CreateComics:React.FC = () => {

    const [comicsInfo, setComicsInfo] = useState<IInfo>(initialInfo);
    const [genres, setGenres] = useState<Array<string>>([]);
    const [pages, setPages] = useState<FileList | null>(null);

    const providedData: IComicsCreation = {
        information: comicsInfo,
        togleInfoForm: (name, value) => setComicsInfo({...comicsInfo, [name]: value}),
        genres: genres,
        togleGenres: (updatedGenres) => setGenres(updatedGenres),
        pages: pages,
        toglePages: (pages) => setPages(pages)
    }

    return (
        <ComicsCreationContext.Provider value = {providedData}>
            <ComicsStepper></ComicsStepper>
        </ComicsCreationContext.Provider>
    );
}

export default CreateComics;