import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { ErrorText, SuccessfulText } from "../shared/text";
import { Text } from "../shared/text";
import { RiCloseFill, RiEdit2Line } from 'react-icons/ri';
import { useAppDispatch } from "../hooks/redux";
import {comicsDeleteSlice} from "../store/comics/slices/comicsDeleteSlice";

export interface IComicsProp {
    id: number,
    name: string,
    isRead: boolean,
    posterPath: string;
}

const Comics: React.FC<IComicsProp> = (props) => {
    const dispatch = useAppDispatch()

    const { posterPath, name, id, isRead } = props;
    const clearPath = posterPath
        .split('')
        .map(symbol => symbol === '\\' ? '/' : symbol)
        .join('');

    const togleActivate = () => dispatch(comicsDeleteSlice.actions.activate(props));

    return (
        <>
            <ComicsCard style={{ width: '18rem' }}>
                <CardHeader className='d-flex justify-content-between'>
                    {isRead
                        ? <SuccessfulText>Опубликован</SuccessfulText>
                        : <ErrorText>Не опубликован</ErrorText>
                    }
                    <div className='text-right'>
                        <IconButton className='me-2' >
                            <RiEdit2Line size={'25'}></RiEdit2Line>
                        </IconButton>
                        <IconButton onClick={togleActivate}>
                            <RiCloseFill size={'25'}></RiCloseFill>
                        </IconButton>
                    </div>
                </CardHeader>
                <Card.Img variant="top" src={`http://localhost:8080/storage?path=${clearPath}`} />
                <ComicsBody>
                    <Text>{name}</Text>
                </ComicsBody>
            </ComicsCard>
        </>
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

const CardHeader = styled(Card.Header)`
    background-color: #FFC204;
    -webkit-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    -moz-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    &:first-child{
        border-radius: 25px 25px 0 0;
    }
    
`

const ComicsCard = styled(Card)`
    padding: 0;
    border-radius: 25px;
    border: none;
`

const ComicsBody = styled(Card.Body)`
    padding: 10px;
`

export default Comics;