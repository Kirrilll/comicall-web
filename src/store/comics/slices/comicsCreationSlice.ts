import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../../enums/fetchingState";
import { IComicsResponse } from "../../../models/comics/comicsResponce";

interface IComicsCreationState {
    updatedComics: IComicsResponse | null,
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
        },
        startUpdate(state, action: PayloadAction<IComicsResponse | null>) {
            state.updatedComics = action.payload;
            state.isUpdating = true;
        },
        creating(state) {
            state.creatingComicsStatus = FetchingState.LOADING;
        },
        createdSuccessfully(state, action: PayloadAction<IComicsResponse>) {
            state.creatingComicsStatus = FetchingState.SUCCESSFUL;
            state.updatedComics = action.payload;
        },
        updatingGenres(state) {
            state.updateComicsGenresStatus = FetchingState.LOADING;
        },
        updatedGenresSuccessfully(state, action: PayloadAction<IComicsResponse>) {
            state.updatedComics = action.payload;
            state.updateComicsGenresStatus = FetchingState.SUCCESSFUL;
        },
        updatingPages(state) {
            state.updateComicsPagesStatus = FetchingState.LOADING;
        },
        updatedPagesSuccessfully(state) {
            state.updateComicsPagesStatus = FetchingState.SUCCESSFUL;
        },
        updatingPublishStatus(state) {
            state.updateComicsPublishStatus = FetchingState.LOADING;
        },
        updatedPublishStatus(state) {
            state.updateComicsPublishStatus = FetchingState.SUCCESSFUL;
        }
    }
})

export default comicsCreationSlice.reducer;