import React, { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { FetchingState } from "../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../models/user/user";
import {useGetComicsQuery } from "../services/authorService";
import { Center } from "../shared/center";
import { getAll } from "../store/comics/thunkes/getAllThunk";
import ComicsContainer from "./comicsContainer";

const AuthorComics: React.FC = () => {
    //const user = useMemo(() => JSON.parse(sessionStorage.getItem('user')!), []);
    const dispatch = useAppDispatch();
    const {comics, status} = useAppSelector(state => state.comicsReducer)
    const {token} = useAppSelector(state => state.userReducer.user)!;

    useEffect(() => {
        dispatch(getAll(token))
    }, [])

    return (
            <div>
                {status == FetchingState.LOADING
                    ? <Center><Spinner as="span" animation="border" role="status" aria-hidden="true" /></Center>
                    : null
                }
                {
                    status == FetchingState.SUCCESSFUL
                        ? <ComicsContainer comics={comics}/>
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