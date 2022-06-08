import React from "react";
import { GENRES, INFORMATION, PAGES, PUBLISH } from "../constants";
import { useAppSelector } from "../hooks/redux";
import ComicsStepper, { IStep } from "./stepper/comicsStepper";
import GenresStep from "./steps/genresStep";
import InfoStep from "./steps/infoStep";
import PagesStep from "./steps/pagesStep";
import PublishStep from "./steps/publisStep";

export interface IComicsInfo {
    name: string,
    description: string,
    logo: File | null,
    publishYear: number | null
}


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