import {createAsyncThunk} from "@reduxjs/toolkit";
import authApi from '../../shared/API/api'


export const loginThunk = createAsyncThunk(
    'auth/login',
    async({login, password}:{login: string; password: string})=>{
        const response = await authApi.login(login, password)
        return response
    }
)
export const checkAuthThunk = createAsyncThunk(
    'auth/checkAuth',
    async ()=>{
        if(localStorage.getItem('accessToken') === ''){
            return false
        }else {
            const response = await authApi.check()
            return response.success
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async()=>{
        const response = await authApi.logout()
        return response.success
    }
)
