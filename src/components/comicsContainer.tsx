import React from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux";
import { IComics } from "../models/comics/comics";
import { Center } from "../shared/center";
import { comicsCreationSlice } from "../store/comics/slices/comicsCreationSlice";
import Comics from "./comics";
import { IoMdAdd } from "react-icons/io";
import {Text} from '../shared/text';

interface IComicsContainerProp {
    comics: Array<IComics>
}

const ComicsContainer: React.FC<IComicsContainerProp> = (props) => {

    const { comics } = props;

    const dispatch = useAppDispatch();
    const openModal = () => dispatch(comicsCreationSlice.actions.startUpdate(null))

    return (
        <Container className='p-3'>
            <Row xs={1} md={2} className='gap-3 justify-content-start'>
                <CreateCard onClick = {openModal}>
                    <Center>
                        <IconGroup>
                            <IoMdAdd  size = '100' color = '#363636'/>
                            <Text>Создать комикс</Text>
                        </IconGroup>
                    </Center>
                </CreateCard>
                {comics.map(comicsItem => <Comics key = {comicsItem.id} {...comicsItem}/>)}
            </Row>
        </Container>
    )
}

const IconGroup = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const CreateCard = styled.div `
    cursor: pointer;
    padding: 15px;
    border-radius: 25px;
    height: 385px;
    width: 280px;
    border: 4px solid #363636;
    &:hover{
        opacity: 0.5;
    }
`

export default ComicsContainer;