import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../../shared/submit";
import { SecondaryButton } from "../../shared/secondaryButton";
import { Container, Form } from "react-bootstrap";
import TextField from "../../shared/textfield";
import { Center } from "../../shared/center";
import UploadImageBox from "../uploaImageBox";
import { useContext } from "react";
import { ComicsCreationContext } from "../createComicsTab";



const InfoStep: React.FC = () => {

    const { information, togleInfoForm, genres, togleGenres, pages } = useContext(ComicsCreationContext)!;

    const togleTitle = (name: string) => togleInfoForm('name', name);
    const toglePreview = (preview: File | null) => togleInfoForm('logo', preview);
    const togleDescription = (description: string) => togleInfoForm('description', description);
    const toglePublishYear = (publishedYear: string) => togleInfoForm('publishYear', Number.parseInt(publishedYear));

    return (
        <>
            <Form className='d-flex justify-content-between gap-4'>
                <Container className='d-flex flex-column gap-3'>
                    <TextField
                        type={'text'}
                        label={'Назвние'}
                        value={information.name}
                        changeHandler={togleTitle}
                        isTextarea={false}
                        mb={0}
                    ></TextField>
                    <TextField
                        isTextarea={true}
                        type={'text'}
                        label={'Описание'}
                        value={information.description}
                        changeHandler={togleDescription}
                        mb={0}
                    ></TextField>
                    <TextField
                        type={'text'}
                        label={'Год публикации'}
                        value={information.publishYear?.toString() ?? ''}
                        changeHandler={toglePublishYear}
                        isTextarea={false}
                        mb={0}
                    ></TextField>
                </Container>
                <UploadImageBox
                    preview={information.logo}
                    setPreview={toglePreview}
                ></UploadImageBox>

            </Form>
        </>
    );
}


export default InfoStep;