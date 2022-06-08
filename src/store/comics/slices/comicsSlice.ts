import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../../enums/fetchingState";
import { IComicsResponse } from "../../../models/comics/comicsResponce";
import { getAll } from "../thunkes/getAllThunk";


interface IComicsState{
    comics: IComicsResponse[],
    status: FetchingState
}

const initialState: IComicsState = {
    comics: [],
    status: FetchingState.IDLE
}


export const comicsSlice = createSlice({
    name: 'comics',
    initialState: initialState,
    reducers: {
        deleteComics(state, action: PayloadAction<number>){
            state.comics = state.comics.filter(item => item.id != action.payload);
        },
        createComics(state, action: PayloadAction<IComicsResponse>){
            state.comics.push(action.payload);
        },
        updateComics(state, action: PayloadAction<IComicsResponse>){
            const comicsIndex = state.comics.findIndex(comics => comics.id == action.payload.id);
            state.comics[comicsIndex] = action.payload;
        }
    },
    extraReducers: {
        [getAll.pending.type]: (state) =>{
            state.status = FetchingState.LOADING
        },
        [getAll.fulfilled.type]: (state, action: PayloadAction<IComicsResponse[]>) => {
            state.status = FetchingState.SUCCESSFUL;
            state.comics = action.payload;
        },
        [getAll.rejected.type]: (state) => {
            state.status = FetchingState.ERROR;
        }
    }
})

export default comicsSlice.reducer;
