import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../../enums/fetchingState";
import { IComics } from "../../../models/comics/comics";
import { IComicsResponse } from "../../../models/comics/comicsResponce";
import { updatePages } from "../thunkes/addPagesThunk";

interface IComicsCreationState {
    updatedComics: IComics | null,
    isUpdating: boolean,
    creatingComicsStatus: FetchingState,
    updateComicsGenresStatus: FetchingState,
    updateComicsPagesStatus: FetchingState,
    updateComicsPublishStatus: FetchingState
}

//При каждом движении изменять updatedComics;
//updatedComics - представление комикса на бэке

const initialValue: IComicsCreationState = {
    updatedComics: null,
    creatingComicsStatus: FetchingState.IDLE,
    isUpdating: false,
    updateComicsGenresStatus: FetchingState.IDLE,
    updateComicsPagesStatus: FetchingState.IDLE,
    updateComicsPublishStatus: FetchingState.IDLE
}

export const comicsCreationSlice = createSlice({
    name: 'comicsCreateSlice',
    initialState: initialValue,
    reducers: {
        reset(state) {
            state.isUpdating = false;
            state.updatedComics = null;
            state. updateComicsGenresStatus = FetchingState.IDLE,
            state.updateComicsPagesStatus = FetchingState.IDLE,
            state.updateComicsPublishStatus = FetchingState.IDLE
        },
        startUpdate(state, action: PayloadAction<IComics| null>) {
            state.updatedComics = action.payload;
            state.isUpdating = true;
        },
        creating(state) {
            state.creatingComicsStatus = FetchingState.LOADING;
        },
        createdSuccessfully(state, action: PayloadAction<IComics>) {
            state.creatingComicsStatus = FetchingState.SUCCESSFUL;
            state.updatedComics = action.payload;
        },
        createdWithError(state){
            state.creatingComicsStatus = FetchingState.ERROR
        },
        updatingGenres(state) {
            state.updateComicsGenresStatus = FetchingState.LOADING;
        },
        updatedGenresSuccessfully(state, action: PayloadAction<IComics>) {
            state.updatedComics = action.payload;
            state.updateComicsGenresStatus = FetchingState.SUCCESSFUL;
        },
        updatingPublishStatus(state) {
            state.updateComicsPublishStatus = FetchingState.LOADING;
        },
        updatedPublishStatus(state) {
            state.updateComicsPublishStatus = FetchingState.SUCCESSFUL;
        }
    },
    extraReducers:{
        [updatePages.pending.type]:(state) =>{
            state.updateComicsPagesStatus = FetchingState.LOADING;
        },
        [updatePages.fulfilled.type]:(state, action: PayloadAction<IComics>) =>{
            state.updateComicsPagesStatus = FetchingState.SUCCESSFUL;
            state.updatedComics = action.payload;
        },
        [updatePages.rejected.type]:(state) =>{
            state.updateComicsPagesStatus = FetchingState.ERROR
        }
    }
})

export default comicsCreationSlice.reducer;