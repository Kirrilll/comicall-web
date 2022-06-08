import React from "react"
import { Spinner } from "react-bootstrap"
import { RiSave3Line } from "react-icons/ri"
import styled from "styled-components"
import { FetchingState } from "../enums/fetchingState"
import { ErrorText, SuccessfulText, Text } from '../shared/text'

interface ISaveable {
    children: React.ReactElement,
    eventHandler: () => void,
    status: FetchingState
}


const Saveable: React.FC<ISaveable> = (props) => {
    const { children, eventHandler, status } = props;
    return (
        <ColumnLayout>
            <SavePanel>
                {status == FetchingState.ERROR? <ErrorText>Не удалось сохранить</ErrorText>: null}
                {status == FetchingState.SUCCESSFUL ? <SuccessfulText>Успешно сохранено</SuccessfulText>: null}
                <SaveGroup>
                    {status == FetchingState.LOADING
                        ? <Spinner as="span" animation="border" role="status" aria-hidden="true" />
                        : <>
                            <RiSave3Line onClick={eventHandler} size={'50'}></RiSave3Line>
                            <Text>Сохранить</Text>
                        </>}
                </SaveGroup>
            </SavePanel>
            {children}
        </ColumnLayout>

    )
}

const SavePanel = styled.div `
    display: flex;
    justify-content: flex-end;
    height: 90px;
    padding: 0 10px;
    align-items: center;
    gap: 20px;

`
const ColumnLayout = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const SaveGroup = styled.div`
    display: flex;
    height: 90px;
    width: 90px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`

export default Saveable;