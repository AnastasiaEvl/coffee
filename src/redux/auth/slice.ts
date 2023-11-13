import {createSlice} from "@reduxjs/toolkit";
import {checkAuthThunk, loginThunk, logoutThunk} from "./thunk";

interface AuthState {
    "authorization"?: boolean,
    "refreshToken"?: string,
    "accessToken"?: string,
    "error"?: unknown
}

const initialState: AuthState= {
    "refreshToken": localStorage.getItem("refreshToken") || undefined,
    "accessToken": localStorage.getItem("accessToken") || undefined
}



export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers :{},
        extraReducers: (builder) => {
            builder.addMatcher(loginThunk.fulfilled.match, (_,action) => {
                if(action.payload.success){
                    localStorage.setItem("refreshToken", action.payload.data.refreshToken)
                    localStorage.setItem("accessToken", action.payload.data.accessToken)
                    return {
                        accessToken:action.payload.data.accessToken,
                        refreshToken: action.payload.data.refreshToken,
                        authorization: true,
                    }
                }else{
                    return{
                        error: action.payload.error,
                        authorization: false
                    }
                }
            })
            builder.addMatcher(loginThunk.rejected.match,(_,action)=>{
                return {
                    error: action.error.message,
                    authorization:false
                }
            })

            builder.addMatcher(checkAuthThunk.fulfilled.match, (state, action)=>{
                state.authorization = action.payload
            })
            builder.addMatcher(checkAuthThunk.rejected.match, (state)=>{
                state.authorization=false
            })

            builder.addMatcher(logoutThunk.fulfilled.match, (state, action)=> {
                state.authorization = action.payload
                if(state.authorization){
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('accessToken')
                }
            })
            builder.addMatcher(logoutThunk.rejected.match, (state)=>{
                state.authorization=false
            })
        }
    }
)
