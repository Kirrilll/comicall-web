import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_PATH } from "../../paths";

interface RoutingState{
    path: string,
    timeout: number
}


const initialState:RoutingState = {
    path: AUTH_PATH,
    timeout: 0
}

export const routingSlice = createSlice({
    name: 'routing',
    initialState: initialState,
    reducers:{
        navTo: (state, action: PayloadAction<string>) =>{
            console.log(action.payload);
            state.path = action.payload;
        },
        navToWithTimeout: (state, action: PayloadAction<RoutingState>) => {
            setTimeout(() => {
                state.path = action.payload.path
            }, action.payload.timeout)
        }
    }
})


export const {navTo, navToWithTimeout} = routingSlice.actions;
export default routingSlice.reducer;