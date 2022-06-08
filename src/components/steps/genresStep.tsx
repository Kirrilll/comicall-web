import axios from "axios";
import React, { useState, DragEvent, useRef } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { FetchingState } from "../../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AuthorService } from "../../services/authorService";
import { Text } from "../../shared/text";
import { addGenres } from "../../store/comics/thunkes/addGenresThunk";
import Saveable from "../saveable";

enum ColumnName {
    CHOSEN,
    ALL
}

interface IDragItem {
    startColumn: ColumnName | null,
    index: number | null
}

const GenresStep: React.FC = () => {

    const dispatch = useAppDispatch();
    const { isUpdating, updatedComics, updateComicsGenresStatus } = useAppSelector(state => state.comicsCreationReducer)
    const [allGenres, setAllGenres] = useState<string[]>([]);
    const user = useAppSelector(state => state.userReducer.user);

    const [genres, setGenres] = useState(new Map<ColumnName, string[]>([
        [ColumnName.CHOSEN, []],
        [ColumnName.ALL, []]
    ]));

    const [dragItem, setDragItem] = useState<IDragItem>({
        startColumn: null,
        index: null
    });

    useEffect(() => {
        AuthorService.getAllGenres(user!.token)
            .then(res => {
                const tempAllGenres = res.data.map(genre => genre.name);
                setAllGenres(tempAllGenres);
                setGenres(new Map()
                    .set(ColumnName.CHOSEN, [])
                    .set(ColumnName.ALL, tempAllGenres)
                )
            });
    }, [])

    useEffect(() => {
        if (!isUpdating) setGenres(new Map()
            .set(ColumnName.CHOSEN, [])
            .set(ColumnName.ALL, allGenres)
        );
        else if (updatedComics != null) setGenres(new Map()
            .set(ColumnName.CHOSEN, updatedComics.genres)
            .set(ColumnName.ALL, allGenres.filter(genre => updatedComics.genres.indexOf(genre) == -1)))
    }, [isUpdating, updatedComics])

    //Вынести часть в хук 

    const dropHandler = (e: DragEvent<HTMLDivElement>, dropColumn: ColumnName) => {
        e.preventDefault();
        e.stopPropagation();

        if (dropColumn == dragItem.startColumn) return;

        const startColumnItems = genres.get(dragItem.startColumn!)!;
        const endColumnItems = genres.get(dropColumn!)!;

        const itemIndex = dragItem.index!;

        const updatedStartItems = [...startColumnItems.slice(0, itemIndex), ...startColumnItems.slice(itemIndex + 1, startColumnItems.length)];
        const updatedEndItems = [...endColumnItems, startColumnItems[itemIndex]];

        const updatedGenres = new Map<ColumnName, Array<string>>()
            .set(dropColumn, updatedEndItems)
            .set(dragItem.startColumn!, updatedStartItems);

        setGenres(updatedGenres);
        setDragItem({ startColumn: null, index: null });
    }


    const dragStartHandler = (e: DragEvent<HTMLDivElement>, name: ColumnName, index: number) => {
        setDragItem({
            startColumn: name,
            index: index
        });
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const eventHandler = () => dispatch(addGenres({
        token: user!.token,
        content: {
            comicsId: updatedComics!.id,
            genres: genres.get(ColumnName.CHOSEN)!
        }
    }));

    return (
        <Saveable eventHandler={eventHandler} status={updateComicsGenresStatus} >
            <ColumnLayout>
                <SelectedGenresColumn id={'chosen-column'} onDrop={(e) => dropHandler(e, ColumnName.CHOSEN)} onDragOver={dragOverHandler}>
                    <Text>Жанры комикса</Text>
                    <GenresContainer className='gap-2'>
                        {genres.get(ColumnName.CHOSEN)!.map((genre, index) => <Genre
                            key={index}
                            draggable={true}
                            onDragStart={(e) => dragStartHandler(e, ColumnName.CHOSEN, index)}
                            onDragEnd={(e) => e.preventDefault()}>
                            {genre}
                        </Genre>)}
                    </GenresContainer>

                </SelectedGenresColumn>
                <GenreColumn id='all-column' onDrop={(e) => dropHandler(e, ColumnName.ALL)} onDragOver={dragOverHandler}>
                    <Text>Доступные жанры</Text>
                    <GenresContainer className='gap-2'>
                        {genres.get(ColumnName.ALL)!.map((genre, index) => <Genre
                            key={index}
                            draggable={true}
                            onDragStart={(e) => dragStartHandler(e, ColumnName.ALL, index)}
                            onDragEnd={(e) => e.preventDefault()}>
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