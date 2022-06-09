import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComicsProp } from "../../../components/comics";
import { FetchingState } from "../../../enums/fetchingState";
import { IComics } from "../../../models/comics/comics";
import comicsSlice from "./comicsSlice";

interface IDeleteComicsState{
    status: FetchingState,
    isModalOpen: boolean,
    target: IComicsProp | null
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
        activate(state, action: PayloadAction<IComicsProp>){
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