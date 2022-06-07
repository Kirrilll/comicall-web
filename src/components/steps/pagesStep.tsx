import React, { useState, useContext, useRef, DragEvent } from "react";
import { Text } from "../../shared/text";
import { UploadBox } from "../../shared/uploadBox";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { Container, Spinner } from "react-bootstrap";
import { ComicsCreationContext } from "../createComicsTab";
import { Center } from "../../shared/center";

const PagesStep: React.FC = () => {
    const { toglePages } = useContext(ComicsCreationContext)!;
    const [previews, setPreviews] = useState<Array<ArrayBuffer | string | null>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        if (e.target.files) {
            toglePages(e.target.files);
            const tempPrevies = [...previews];
            for (let i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i]) {
                    const value = await loadImage(e.target.files[i]) as ArrayBuffer | string | null;
                    tempPrevies.push(value);
                }
            }
            setPreviews(tempPrevies);
            setIsLoading(false)
        }
    }

    const loadImage = (file: File) => {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
        })
    }

    return (
        isLoading
            ? <Center>
                <Spinner style={{ width: '100px', height: '100px' }} animation="border" role="status" variant='warning'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Center>
            : <StepContainer>
                <PagesContainer className='gap-3'>
                    {
                        previews?.map((preview, index) => <Page key={index}>
                            <img id="uploaded-image"
                                src={preview?.toString()}
                                draggable={false}
                                alt="uploaded-img" />
                        </Page>
                        )
                    }
                    <PageAddCard>
                        <UploadInput htmlFor="upload-multi-input">
                            <IoIosAdd color={'#FFC204'} size={'100'}></IoIosAdd>
                            <Text>Загрузите страницы</Text>
                        </UploadInput>
                        <input onChange={handleImages} id="upload-multi-input" type="file" multiple accept=".jpg,.jpeg,.png" />
                    </PageAddCard>
                </PagesContainer>

            </StepContainer>
    )
}

const StepContainer = styled(Container)`
    overflow-y: auto;
    height: 100%;
    &::-webkit-scrollbar {
        width: 12px;              
    }
    &::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #FFC204;
        border: 2px solid #D19F00;
        border-radius: 100px;
    }
`

const PagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Page = styled.div`
    border: 1px dashed #363636;
    position: relative;
    width: 200px;
    height: 300px;
    background: #F7F7F7;
    border-radius: 20px;
    padding: 10px;
    >img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 20px;
    }
`


const UploadInput = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`;

const PageAddCard = styled(UploadBox)`
    width: 200px;
    height: 300px;
    margin: 0;
    >input{
        display: none;
    }

`

export default PagesStep;