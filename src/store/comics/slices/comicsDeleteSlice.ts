import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../../enums/fetchingState";
import { IComics } from "../../../models/comics/comics";

interface IDeleteComicsState{
    status: FetchingState,
    isModalOpen: boolean,
    target: IComics | null
}

const initialState: IDeleteComicsState = {
    status: FetchingState.IDLE,
    isModalOpen: false,
    target: null
}

export const comicsDeleteSlice = createSlice({
    name: 'deleteSlice',
    initialState: initialState,
    reducers:{
        activate(state, action: PayloadAction<IComics>){
            state.isModalOpen = true;
            state.target = action.payload;
        },
        deactivate(state){
            state.isModalOpen = false;
            state.target = null;
        },
        deleting(state){
            state.status = FetchingState.LOADING
        },
        deletedSuccessfully(state){
            state.status = FetchingState.IDLE,
            state.isModalOpen = false;
            state.target = null;
        },
        deleteError(state){
            state.status = FetchingState.ERROR
        }
    }
})

export default comicsDeleteSlice.reducer;