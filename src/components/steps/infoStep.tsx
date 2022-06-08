import React, { useState } from "react";
import styled from "styled-components";
import { SubmitButton } from "../../shared/submit";
import { SecondaryButton } from "../../shared/secondaryButton";
import { Container, Form } from "react-bootstrap";
import TextField from "../../shared/textfield";
import { Center } from "../../shared/center";
import UploadImageBox from "../uploaImageBox";
import { useContext } from "react";
import { IComicsInfo } from "../createComicsTab";
import Saveable from "../saveable";
import { FetchingState } from "../../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { create } from "../../store/comics/thunkes/createThunk";
import { useEffect } from "react";

const initialInfo: IComicsInfo = {
    name: '',
    description: '',
    logo: null,
    publishYear: null
}

const InfoStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.userReducer);
    const {updatedComics, isUpdating ,creatingComicsStatus} = useAppSelector(state => state.comicsCreationReducer);
    const [comicsInfo, setComicsInfo] = useState<IComicsInfo>(initialInfo);

    useEffect(() => {
        setComicsInfo(initialInfo);
    }, [isUpdating])

    const togleName = (value: string) => setComicsInfo({...comicsInfo, name: value});
    const togleLogo = (logo: File | null) => setComicsInfo({...comicsInfo, logo: logo});
    const togleDescription = (description: string) =>  setComicsInfo({...comicsInfo, description: description});
    const toglePublishYear = (publishedYear: string) => {
        const value = Number.parseInt(publishedYear);
        let tempPublishYear = comicsInfo.publishYear;
        if (!Number.isNaN(value)) tempPublishYear = value
        else if (publishedYear == '') tempPublishYear = null;
        setComicsInfo({...comicsInfo, publishYear: tempPublishYear});
    };

    const createComics = () => dispatch(create({ token: user!.token, content: comicsInfo }));

    return (
        <>
            <Saveable status={creatingComicsStatus} eventHandler={createComics}>
                <Form className='d-flex justify-content-between gap-4'>
                    <Container className='d-flex flex-column gap-3'>
                        <TextField
                            type={'text'}
                            label={'Назвние'}
                            value={comicsInfo.name}
                            changeHandler={togleName}
                            isTextarea={false}
                            mb={0}
                        ></TextField>
                        <TextField
                            isTextarea={true}
                            type={'text'}
                            label={'Описание'}
                            value={comicsInfo.description}
                            changeHandler={togleDescription}
                            mb={0}
                        ></TextField>
                        <TextField
                            type={'text'}
                            label={'Год публикации'}
                            value={comicsInfo.publishYear?.toString() ?? ''}
                            changeHandler={toglePublishYear}
                            isTextarea={false}
                            mb={0}
                        ></TextField>
                    </Container>
                    <UploadImageBox
                        preview={comicsInfo.logo}
                        setPreview={togleLogo}
                    ></UploadImageBox>
                </Form>
            </Saveable>

        </>
    );
}


export default InfoStep;