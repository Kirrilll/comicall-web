import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../enums/fetchingState";
import { IUser } from "../../models/user/user"
import { signIn } from "./signInThunk";
import { signUp } from "./signUpThunk";

interface UserState{
    user: IUser | null,
    signInState: FetchingState,
    signUpState: FetchingState
}



const initialState: UserState = {
    user: sessionStorage.getItem('user') == null ? null : JSON.parse(sessionStorage.getItem('user')!) ,
    signInState: FetchingState.IDLE,
    signUpState: FetchingState.IDLE,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        logout(state){
            state.user = null;
            sessionStorage.clear();
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state, action: PayloadAction<IUser>) => {
            state.signInState = FetchingState.LOADING;
        },
        [signIn.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.signInState = FetchingState.SUCCESSFUL;
            state.user = action.payload;
            sessionStorage.setItem('user', JSON.stringify(state.user))
        },
        [signIn.rejected.type]: (state, action: PayloadAction<IUser>) => {
            state.signInState = FetchingState.ERROR
        },

        [signUp.pending.type]: (state) => {
            state.signUpState = FetchingState.LOADING
        },
        [signUp.fulfilled.type]: (state, action ) => {
            state.signUpState = FetchingState.SUCCESSFUL;     
        },
        [signUp.rejected.type]: (state,) => {
            state.signUpState = FetchingState.ERROR
        },
    }
});

export default userSlice.reducer;