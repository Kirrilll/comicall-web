import React from "react";
import { Container, Row } from "react-bootstrap";
import { IComics } from "../models/comics/comics";
import { Center } from "../shared/center";
import Comics from "./comics";

interface IComicsContainerProp {
    comics: Array<IComics>
}

const ComicsContainer: React.FC<IComicsContainerProp> = (props) => {

    const { comics } = props;

    return (
        <Container className='p-3'>
            <Row xs={1} md={2} className='gap-3 justify-content-start'>
                {comics.map(comicsItem => <Comics
                    key={comicsItem.id}
                    name={comicsItem.name}
                    posterPath={comicsItem.posterPath}
                    id={comicsItem.id}
                    isRead={comicsItem.isReady}
                />)}
            </Row>
        </Container>
    )
}

export default ComicsContainer;