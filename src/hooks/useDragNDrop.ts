
import { useState, DragEvent } from "react";
import { ALL } from "../components/steps/genresStep";

interface IDnDProp {
    columns: Map<string, string[]>,
    handleColums: (value: Map<string, string[]>) => void
}

interface IDragItem {
    startColumn: string | null,
    index: number | null
}

export const useDragNDrop = (params: IDnDProp) => {

    const { columns, handleColums } = params

    const [dragItem, setDragItem] = useState<IDragItem>({
        startColumn: null,
        index: null
    });

    const dropHandler = (e: DragEvent<HTMLDivElement>, dropColumn: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (dropColumn == dragItem.startColumn) return;

        const startColumnItems = columns.get(dragItem.startColumn!)!;
        const endColumnItems = columns.get(dropColumn!)!;

        const itemIndex = dragItem.index!;

        const updatedStartItems = [...startColumnItems.slice(0, itemIndex), ...startColumnItems.slice(itemIndex + 1, startColumnItems.length)];
        const updatedEndItems = [...endColumnItems, startColumnItems[itemIndex]];

        const updatedGenres = new Map<string, Array<string>>()
            .set(dropColumn, updatedEndItems)
            .set(dragItem.startColumn!, updatedStartItems);

        handleColums(updatedGenres);
        setDragItem({ startColumn: null, index: null });
    }


    const dragStartHandler = (e: DragEvent<HTMLDivElement>, name: string, index: number) => {
        setDragItem({
            startColumn: name,
            index: index
        });
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return {
        draggable: {
            draggable: true,
            onDragEnd: (e: DragEvent<HTMLDivElement>) => e.preventDefault()
        },
        dropZone: {
            onDragOver: dragOverHandler
        },
        helpers: {
            dragStartHandler: dragStartHandler,
            dropHandler: dropHandler
        }
    }

}