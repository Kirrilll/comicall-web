import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { RiCloseFill, RiFolderDownloadFill } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import styled from "styled-components";
import { usePreview } from "../hooks/usePreview";
import { UploadBox, ImagePreview } from "../shared/uploadBox";
import { Text } from '../shared/text'
import { ErrorText } from "../pages/authencticationPage";
import { SecondaryButton } from "../shared/secondaryButton";

interface IUploadImageBox {
    preview: File | null
    setPreview: (preview: File | null) => void
}

const UploadImageBox: React.FC<IUploadImageBox> = (props) => {

    const { preview, setPreview } = props;

    const image = usePreview(preview);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setPreview(e.target.files[0]);
        }
    }

    return (
        <Container className = 'text-center'>
            <UploadBox>
                <div className="image-upload">
                    {image == null
                        ? (
                            <>
                                <label htmlFor="upload-input">
                                    <MdOutlineDriveFolderUpload color={'#FFC204'} size={'100'}></MdOutlineDriveFolderUpload>
                                    <Text>Загрузите ваше превью</Text>
                                </label>

                                <input
                                    id="upload-input"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageChange}
                                />
                            </>
                        )
                        : (
                            <ImagePreview className='close-icon'>
                                <img
                                    id="uploaded-image"
                                    src={image?.toString()}
                                    draggable={false}
                                    alt="uploaded-img"
                                />
                            </ImagePreview>
                        )}
                </div>
            </UploadBox>
            {image ? <DeleteLink onClick = {() => setPreview(null)}>Очистить</DeleteLink> : null}
        </Container>
    );
}

const DeleteLink = styled(ErrorText)  `
    cursor: pointer;
    font-size: 36px;
    margin-top: 10px;
    &:hover{
        text-decoration: underline;
    }
`

const UploadBoxContainer = styled(Container)`
    padding: 0;
`

export default UploadImageBox;