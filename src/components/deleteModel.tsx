import React, { useMemo } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { SubmitButton } from "../shared/submit";
import { Text } from "../shared/text";
import styled from "styled-components";
import { SecondaryButton } from "../shared/secondaryButton";
import { useDeleteComicsMutation } from '../services/authorService';
import { useAppSelector } from "../hooks/redux";

interface IDeleteModalProp {
    handleHide: () => void,
    comicsId: number,
    isShown: boolean,
    title: string
}

const DeleteModal: React.FC<IDeleteModalProp> = (props) => {

    const user = useAppSelector(state => state.userReducer.user);
    const { handleHide, comicsId, isShown, title } = props;

    const [deleteComics, { isLoading, isSuccess, isError }] = useDeleteComicsMutation();
    const handleComics = () =>{ 
        deleteComics({ comicsId: comicsId, token: user!.token }) 
        handleHide();
    };

    return (
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isShown}
        >
            <Modal.Body>
                <Text className = 'text-center p-3'>
                    Вы уверены что хотите удалить <b>{title}</b>?
                </Text>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-row gap-2' >
                <ModalSubmitButton className='flex-fill' onClick={handleComics}>
                    <Text>
                        {isLoading
                            ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            : 'Да'
                        }
                    </Text>
                </ModalSubmitButton>
                <ModalSecondaryButton className='flex-fill' onClick={handleHide}>
                    <Text>Нет</Text>
                </ModalSecondaryButton>
            </Modal.Footer>
        </Modal>
    )
}


const ModalSubmitButton = styled(SubmitButton)`
    min-width: 10px;
`

const ModalSecondaryButton = styled(SecondaryButton)`
    min-width: 10px;
`


export default DeleteModal;