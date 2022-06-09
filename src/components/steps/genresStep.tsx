import axios from "axios";
import React, { useState, DragEvent, useRef, useLayoutEffect } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { ALL, CHOSEN } from "../../constants";
import { FetchingState } from "../../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDragNDrop } from "../../hooks/useDragNDrop";
import { AuthorService } from "../../services/authorService";
import { Text } from "../../shared/text";
import { addGenres } from "../../store/comics/thunkes/addGenresThunk";
import Saveable from "../saveable";

const GenresStep: React.FC<{ allGenres: string[] }> = (props) => {

    const { allGenres } = props;

    const initialGenres = new Map().set(CHOSEN, []).set(ALL, allGenres);

    const dispatch = useAppDispatch();
    const { isUpdating, updatedComics, updateComicsGenresStatus } = useAppSelector(state => state.comicsCreationReducer)
    const user = useAppSelector(state => state.userReducer.user);

    const [genres, setGenres] = useState(new Map<string, string[]>(initialGenres));

    useEffect(() => {
        if (updatedComics != null) {
            const tempGenres = new Map<string, string[]>();
            const comicsGenres = updatedComics.genres.map(genre => genre.name);
            tempGenres
                .set(CHOSEN, comicsGenres)
                .set(ALL, allGenres.filter(genre => comicsGenres.indexOf(genre) == -1));
            setGenres(tempGenres);
        }
        return () => setGenres(initialGenres);
    }, [])

    const { draggable, dropZone, helpers } = useDragNDrop({ columns: genres, handleColums: value => setGenres(value) })


    const eventHandler = () => dispatch(addGenres({
        token: user!.token,
        content: {
            comicsId: updatedComics!.id,
            genres: genres.get(CHOSEN)!
        }
    }));

    return (
        <Saveable eventHandler={eventHandler} status={updateComicsGenresStatus} >
            <ColumnLayout>
                <SelectedGenresColumn id={'chosen-column'} onDrop={(e) => helpers.dropHandler(e, CHOSEN)} {...dropZone}>
                    <Text>Жанры комикса</Text>
                    <GenresContainer className='gap-2'>
                        {genres.get(CHOSEN)!.map((genre, index) => <Genre
                            key={index}
                            {...draggable}
                            onDragStart={e => helpers.dragStartHandler(e, CHOSEN, index)}>
                            {genre}
                        </Genre>)}
                    </GenresContainer>

                </SelectedGenresColumn>
                <GenreColumn id='all-column' onDrop={(e) => helpers.dropHandler(e, ALL)} {...dropZone}>
                    <Text>Доступные жанры</Text>
                    <GenresContainer className='gap-2'>
                        {genres.get(ALL)!.map((genre, index) => <Genre
                            key={index}
                            {...draggable}
                            onDragStart={e => helpers.dragStartHandler(e, ALL, index)}>
                            {genre}
                        </Genre>)}
                    </GenresContainer>
                </GenreColumn>
            </ColumnLayout>
        </Saveable>
    )
}


const GenresContainer = styled.div`
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    justify-content: start;
`

const Genre = styled.div`
    background: rgba(255, 194, 4, 0.25);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    padding: 7px 15px;;
    font-size: 24px;
    font-weight: 700;
`

const ColumnLayout = styled.div`
    display: flex;
    height: 100%;
`
const GenreColumn = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
`

const SelectedGenresColumn = styled(GenreColumn)`
    border-right: 2px solid rgba(54, 54, 54, 0.75);
    border-left: 2px solid rgba(54, 54, 54, 0.75);
`
export default GenresStep;