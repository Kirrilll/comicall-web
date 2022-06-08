import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import ComicsStepper, { IStep } from "./stepper/comicsStepper";
import GenresStep from "./steps/genresStep";
import InfoStep from "./steps/infoStep";
import PagesStep from "./steps/pagesStep";
import PublishStep from "./steps/publisStep";

const INFORMATION: string = 'info';
const GENRES: string = 'genres';
const PAGES: string = 'pages';
const PUBLISH: string = 'publish';

export interface IComicsInfo {
    name: string,
    description: string,
    logo: File | null,
    publishYear: number | null
}

interface IComicsCreation {
    information: IComicsInfo,
    togleInfoForm: (name: string, value: string | File | null | number) => void
    genres: Array<string>,
    togleGenres: (genres: Array<string>) => void,
    pages: FileList | null,
    toglePages: (pages: FileList | null) => void
}

export const ComicsCreationContext = React.createContext<IComicsCreation | null>(null);

const CreateComics: React.FC = () => {

    const updatedComics = useAppSelector(state => state.comicsCreationReducer.updatedComics);

    const isInfoFinished = () => updatedComics != null;
    const isGenresFinished = () => updatedComics != null && updatedComics.genres.length > 0;

    const steps: IStep[] = [
        {
            name: INFORMATION,
            label: 'Информация',
            content: <InfoStep></InfoStep>,
            isFinished: isInfoFinished()
        },
        {
            name: GENRES,
            label: 'Жанры',
            content: <GenresStep></GenresStep>,
            isFinished: isGenresFinished()
        },
        {
            name: PAGES,
            label: 'Страницы',
            content: <PagesStep></PagesStep>,
            isFinished: true
        },
        {
            name: PUBLISH,
            label: 'Публикация',
            content: <PublishStep></PublishStep>,
            isFinished: false
        },
    ]
    return (
        <ComicsStepper steps={steps}></ComicsStepper>
    );
}

export default CreateComics;