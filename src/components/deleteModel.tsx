import React, { useMemo } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { SubmitButton } from "../shared/submit";
import { Text } from "../shared/text";
import styled from "styled-components";
import { SecondaryButton } from "../shared/secondaryButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteById } from "../store/comics/thunkes/deleteThunk";
import {comicsDeleteSlice} from "../store/comics/slices/comicsDeleteSlice";
import { FetchingState } from "../enums/fetchingState";

const DeleteModal: React.FC = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.userReducer.user)!;
    const {isModalOpen, target, status} = useAppSelector(state => state.deleteComicsReducer);
    const deleteComics = () =>   dispatch(deleteById({token: user.token, content: target!.id}));
    const hide = () =>  dispatch(comicsDeleteSlice.actions.deactivate());


    return (
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isModalOpen}
        >
            <Modal.Body>
                <Text className = 'text-center p-3'>
                    Вы уверены что хотите удалить <b>{target?.name}</b>?
                </Text>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-row gap-2' >
                <ModalSubmitButton className='flex-fill' onClick={deleteComics}>
                    <Text>
                        {status == FetchingState.LOADING
                            ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            : 'Да'
                        }
                    </Text>
                </ModalSubmitButton>
                <ModalSecondaryButton className='flex-fill' onClick={hide}>
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