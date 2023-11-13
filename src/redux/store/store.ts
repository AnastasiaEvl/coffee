import {combineReducers} from "redux";
import {authReducer} from "../auth";
import {configureStore} from "@reduxjs/toolkit";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

const rootReducer = combineReducers({
    auth:authReducer,
})


export const store:ToolkitStore = configureStore(
    {
        reducer: rootReducer,
        devTools: true,
    })



export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
