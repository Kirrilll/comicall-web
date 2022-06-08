import { combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import comicsReducer from './comics/slices/comicsSlice'
import deleteComicsReducer from "./comics/slices/comicsDeleteSlice";
import comicsCreationReducer from "./comics/slices/comicsCreationSlice";

const rootReducer = combineReducers({
    userReducer,
    comicsReducer,
    deleteComicsReducer,
    comicsCreationReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']