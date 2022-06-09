import React from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import { FetchingState } from "../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Center } from "../shared/center";
import { getAll } from "../store/comics/thunkes/getAllThunk";
import ComicsContainer from "./comicsContainer";
import CreateComics from "./createComicsTab";
import DeleteModal from "./deleteModel";
import Modal from '../components/customModal';
import { comicsCreationSlice } from "../store/comics/slices/comicsCreationSlice";
import { useState } from "react";
import { AuthorService } from "../services/authorService";
import { addGenres } from "../store/comics/thunkes/addGenresThunk";

const AuthorComics: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comics, status } = useAppSelector(state => state.comicsReducer)
    const { token } = useAppSelector(state => state.userReducer.user)!;
    const isUpdating = useAppSelector(state => state.comicsCreationReducer.isUpdating);

    const [allGenres, setAllGenres] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getAll(token));
        AuthorService.getAllGenres(token)
            .then(res => setAllGenres(res.data.map(genre => genre.name)))
    }, [])

    return (
        <div>

            <Modal isShow={isUpdating} togleShow={() => dispatch(comicsCreationSlice.actions.reset())}>
                <CreateComics allGenres = {allGenres}></CreateComics>
            </Modal>
            <DeleteModal></DeleteModal>
            {status == FetchingState.LOADING
                ? <Center><Spinner as="span" animation="border" role="status" aria-hidden="true" /></Center>
                : null
            }
            {
                status == FetchingState.SUCCESSFUL
                    ? <ComicsContainer comics={comics} />
                    : null
            }
            {
                status == FetchingState.ERROR
                    ? 'Ошибка'
                    : null
            }
        </div>
    )
}


export default AuthorComics;