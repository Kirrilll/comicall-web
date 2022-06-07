import styled from 'styled-components'


export const UploadBox = styled.div`
    display: grid;
    margin-top: 20px;
    place-items: center;
    border: 1px dashed #363636;
    position: relative;
    height: 380px;
    width: 320px;
    background: #F7F7F7;
    border-radius: 20px;
    .image-upload {
        display: flex;
        flex-wrap:wrap;
        label {
            text-align: center;
            cursor: pointer;
            :hover {
                opacity: .8;
            }
        }
        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */
    #uploaded-image{
        height: 370px;
        width: 310px;
        object-fit: contain;
        border-radius: 20px;
    }
    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;
        :hover {
            opacity: 1;
        }   
    }
`