import React, { useState, DragEvent, useRef } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { Text } from "../../shared/text";

enum ColumnName {
    CHOSEN,
    ALL
}

interface IDropColumn {
    columnName: ColumnName
    items: Array<string>
}

interface IDragItem {
    startColumn: ColumnName | null,
    index: number | null
}

const GenresStep: React.FC = () => {

    const [genres, setGenres] = useState(new Map([
        [ColumnName.CHOSEN, []],
        [ColumnName.ALL, ['Детектив', 'Триллер', 'Ужасы', 'Драма', 'Фентези', 'Фантастика', 'Супергероика']]
    ]));

    const [dragItem, setDragItem] = useState<IDragItem>({
        startColumn: null,
        index: null
    });

    const dropHandler = (e: DragEvent<HTMLDivElement>, dropColumn: ColumnName) => {
        e.preventDefault();
        e.stopPropagation();

        if(dropColumn == dragItem.startColumn) return;

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

    return (
        <ColumnLayout>

            <SelectedGenresColumn id={'chosen-column'} onDrop={(e) => dropHandler(e, ColumnName.CHOSEN)} onDragOver={dragOverHandler}>
                <Text>Жанры комикса</Text>
                <GenresContainer className = 'gap-2'>
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
                <GenresContainer className = 'gap-2'>
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