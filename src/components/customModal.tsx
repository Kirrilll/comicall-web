import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ErrorText } from "../shared/text";

interface IModal {
    isShow: boolean,
    togleShow: () => void,
    children: React.ReactElement
}

const Modal: React.FC<IModal> = (props) => {
    const { isShow, togleShow, children } = props;

    return (
        isShow
            ?
            <>
                <Backdrop></Backdrop>
                <ModalLayout>
                    <ModalContent>
                        <ModalHeader>
                            <CloseText onClick={togleShow}>
                                Закрыть
                            </CloseText>
                        </ModalHeader>
                        {children}
                    </ModalContent>
                </ModalLayout>
            </>
            : null
    )
}

const CloseText = styled(ErrorText)`
    font-size: 32px;
    cursor:pointer;

`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    width: 100%;
    height: 810px;
`

const ModalHeader = styled.div`
    display: flex;
    height: 30px;
    justify-content: flex-end;
`

const Backdrop = styled.div`
    position: fixed;
    background-color: #000;
    opacity: 0.5;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
 `

const ModalLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 110;
`

export default Modal;