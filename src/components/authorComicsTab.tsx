import React, { useState } from "react";
import { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { IUser } from "../models/user/user";
import {useGetComicsQuery } from "../services/authorService";
import { Center } from "../shared/center";
import ComicsContainer from "./comicsContainer";

const AuthorComics: React.FC = () => {
    const user = useMemo(() => JSON.parse(sessionStorage.getItem('user')!), []);

    const { isLoading, isError, isSuccess, data } = useGetComicsQuery(user!.token)

    return (
            <div>
                {isLoading
                    ? <Center><Spinner as="span" animation="border" role="status" aria-hidden="true" /></Center>
                    : null
                }
                {
                    isSuccess
                        ? <ComicsContainer comics={data ?? []} />
                        : null
                }
                {
                    isError
                        ? 'Ошибка'
                        : null
                }
            </div>
    )
}

export default AuthorComics;