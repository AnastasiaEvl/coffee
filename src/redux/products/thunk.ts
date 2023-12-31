import {AsyncThunk, createAsyncThunk} from "@reduxjs/toolkit";
import ProductsApi from "../../shared/API/products";
import {IProduct} from "../../core/types/IProduct";

export const fetchHotDrinks:  AsyncThunk<IProduct[], void, any> = createAsyncThunk(
    'countries/fetchCountries',
    async (_,{rejectWithValue})=> {
        try {
            return await ProductsApi.fetchHot()
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchColdDrinks: AsyncThunk<IProduct[], void, any> = createAsyncThunk(
    'country/fetchCountry',
    async (_, {rejectWithValue}) => {
        try{
            return await ProductsApi.fetchCold()
        }
        catch (error:any){
            return rejectWithValue(error.response.data)
        }

    }
)

export const fetchTeaDrinks: AsyncThunk<IProduct[], void, any> = createAsyncThunk(
    'country/fetchCountry',
    async (_, {rejectWithValue}) => {
        try{
            return await ProductsApi.fetchTea()
        }
        catch (error:any){
            return rejectWithValue(error.response.data)
        }

    }
)
