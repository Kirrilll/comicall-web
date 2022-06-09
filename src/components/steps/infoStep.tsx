import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import TextField from "../../shared/textfield";
import UploadImageBox from "../uploaImageBox";
import { IComicsInfo } from "../createComicsTab";
import Saveable from "../saveable";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { create } from "../../store/comics/thunkes/createThunk";
import { useEffect } from "react";
import { updateInfo } from "../../store/comics/thunkes/updateInfoThunk";

const initialInfo: IComicsInfo = {
    name: '',
    description: '',
    logo: null,
    publishYear: null
}

const InfoStep: React.FC = () => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.userReducer);
    const { updatedComics, creatingComicsStatus } = useAppSelector(state => state.comicsCreationReducer);

    const initialValue: IComicsInfo = updatedComics != null
        ? {
            name: updatedComics.name,
            description: updatedComics.description,
            logo: updatedComics.posterPath,
            publishYear: updatedComics.publishYear
        }
        : initialInfo

    const [comicsInfo, setComicsInfo] = useState<IComicsInfo>(initialValue);

    useEffect(() => {
        return () => setComicsInfo(initialInfo);
    }, [])

    //Регулярка на toglePublisYear
    const togleName = (value: string) => setComicsInfo({ ...comicsInfo, name: value });
    const togleLogo = (logo: File | null) => setComicsInfo({ ...comicsInfo, logo: logo });
    const togleDescription = (description: string) => setComicsInfo({ ...comicsInfo, description: description });
    const toglePublishYear = (publishedYear: string) => {
        const value = Number.parseInt(publishedYear);
        let tempPublishYear = comicsInfo.publishYear;
        if (!Number.isNaN(value)) tempPublishYear = value
        else if (publishedYear == '') tempPublishYear = null;
        setComicsInfo({ ...comicsInfo, publishYear: tempPublishYear });
    };

    const handleSaving = () => {
        if (updatedComics != null) {
            dispatch(updateInfo({
                token: user!.token,
                content: {
                    comicsId: updatedComics.id,
                    info: comicsInfo
                }
            }))
        }
        else {
            dispatch(create({ token: user!.token, content: comicsInfo }));
        }
    }

    return (
        <>
            <Saveable status={creatingComicsStatus} eventHandler={handleSaving}>
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