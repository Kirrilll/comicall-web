import React, { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { FetchingState } from "../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Center } from "../shared/center";
import { getAll } from "../store/comics/thunkes/getAllThunk";
import ComicsContainer from "./comicsContainer";
import DeleteModal from "./deleteModel";

const AuthorComics: React.FC = () => {
    const dispatch = useAppDispatch();
    const { comics, status } = useAppSelector(state => state.comicsReducer)
    const { token } = useAppSelector(state => state.userReducer.user)!;

    useEffect(() => {
        dispatch(getAll(token))
    }, [])

    return (
        <div>
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