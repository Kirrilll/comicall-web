import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Center } from "../../shared/center";
import { ErrorText, SuccessfulText, Text } from "../../shared/text";
import { RiSave3Line } from "react-icons/ri";
import Saveable from "../saveable";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { updatePublish } from "../../store/comics/thunkes/updatePublishThunk";


const PublishStep: React.FC = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.userReducer.user);
    const { updatedComics, isUpdating, updateComicsPublishStatus } = useAppSelector(state => state.comicsCreationReducer);
    const [isPublish, setIsPublish] = useState(updatedComics?.isReady ?? false);

    useEffect(() => {
        () => setIsPublish(false);
    }, [])

    const eventHandler = () => dispatch(updatePublish({
        token: user!.token,
        content: {
            comicsId: updatedComics!.id,
            isRead: isPublish
        }
    }));

    return (
        <Saveable eventHandler = {eventHandler} status = {updateComicsPublishStatus}> 
            <PublishContainer>
                <Center>
                    <ButtonsGroup>
                        <ChosableItem onClick={() => setIsPublish(true)} className={isPublish ? 'isChosen' : ''}>Опубликовать</ChosableItem>
                        <ChosableItem onClick={() => setIsPublish(false)} className={!isPublish ? 'isChosen' : ''}>Не опубликовывать</ChosableItem>
                    </ButtonsGroup>
                </Center>
                <ChosenLabel>
                    Выбрано -
                    {isPublish
                        ? <SuccessfulText as='label'>Опубликовать</SuccessfulText>
                        : <ErrorText as='label'>Не опубликовать</ErrorText>}
                </ChosenLabel>
            </PublishContainer>
        </Saveable>

    )
}


const ChosableItem = styled.div`
    cursor: pointer;
    font-size: 34px;
    font-weight: 700;
    color: #36363699;
    &.isChosen{
        font-size: 48px;
        color: #363636;
    }

`

const SaveGroup = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`

const ButtonsGroup = styled.div`
    display: flex;
    gap: 50px;
    align-items: center;
`

const PublishContainer = styled.div`
    height: 100%;
    position: relative;
`

const ChosenLabel = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: 28px;
    font-weight: 700;
    color: #363636;
    font-style: normal;
`

export default PublishStep;