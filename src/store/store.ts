import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { AuthApi } from "../services/AuthService";
import userReducer from './user/userSlice'
import routeReducer from './routing/routingSlice'
import comicsReducer from './comics/slices/comicsSlice'
import { AuthorService } from "../services/authorService";

const rootReducer = combineReducers({
    routeReducer,
    userReducer,
    comicsReducer,
    [AuthorService.reducerPath]: AuthorService.reducer, 
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthorService.middleware)
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']