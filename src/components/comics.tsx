import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { ErrorText, SuccessfulText } from "../shared/text";
import { Text } from "../shared/text";
import { RiCloseFill, RiEdit2Line } from 'react-icons/ri';
import { useAppDispatch } from "../hooks/redux";
import { comicsDeleteSlice } from "../store/comics/slices/comicsDeleteSlice";
import { IComics } from "../models/comics/comics";
import { comicsCreationSlice } from "../store/comics/slices/comicsCreationSlice";


const Comics: React.FC<IComics> = (props) => {
    const dispatch = useAppDispatch()

    const { posterPath, name, id, isReady } = props;
    const clearPath = posterPath
        .split('')
        .map(symbol => symbol === '\\' ? '/' : symbol)
        .join('');

    const togleActivate = () => dispatch(comicsDeleteSlice.actions.activate(props));
    const togleUpdate = () => dispatch(comicsCreationSlice.actions.startUpdate(props));

    return (
        <ComicsCard>
            <CardHeader className='d-flex justify-content-between'>
                {isReady
                    ? <SuccessfulText>Опубликован</SuccessfulText>
                    : <ErrorText>Не опубликован</ErrorText>
                }
                <div className='text-right'>
                    <IconButton onClick={togleUpdate} className='me-2' >
                        <RiEdit2Line size={'25'}></RiEdit2Line>
                    </IconButton>
                    <IconButton onClick={togleActivate}>
                        <RiCloseFill size={'25'}></RiCloseFill>
                    </IconButton>
                </div>
            </CardHeader>
            <CardImg src={`http://localhost:8080/storage?path=${clearPath}`} />
            <ComicsBody>
                <Text>{name}</Text>
            </ComicsBody>
        </ComicsCard>
    )
}

const IconButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    &:focus{
        border: none;
        outline: none;
    }
`

const ComicsCard = styled.div`
    padding: 0;
    border-radius: 25px;
    border: none;
    max-height: 385px;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    background-color: #F7F7F7;
`

const CardImg = styled.img`
    width: 100%;
    height: 300px;
    object-fit: fill;
`

const CardHeader = styled.div`
    padding: 10px;
    background-color: #FFC204;
    -webkit-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    -moz-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    &:first-child{
        border-radius: 25px 25px 0 0;
    }
    
`

const ComicsBody = styled.div`
    height: 50px;
    padding: 5px 15px;
`

export default Comics;