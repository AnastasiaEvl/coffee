import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../core/types/IProduct";
import {fetchColdDrinks, fetchHotDrinks, fetchTeaDrinks} from "./thunk";

interface ProductState {
    isLoading: boolean,
    productHot: IProduct[]
    productCold: IProduct[]
    productTea: IProduct[]
    error: unknown
}

const initialState: ProductState = {
    isLoading: false,
    productHot: [],
    productCold: [],
    productTea:[],
    error: ''
}
export const productSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addMatcher(fetchHotDrinks.pending.match, (state)=>{
            state.isLoading = true
        })
        builder.addMatcher(fetchHotDrinks.fulfilled.match, (state, action)=>{
            state.isLoading = false
            state.productHot = action.payload
        })
        builder.addMatcher(fetchHotDrinks.rejected.match, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        builder.addMatcher(fetchColdDrinks.pending.match, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(fetchColdDrinks.fulfilled.match, (state, action) => {
            state.isLoading = false
            state.productCold = action.payload
        })
        builder.addMatcher(fetchColdDrinks.rejected.match, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addMatcher(fetchTeaDrinks.pending.match, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(fetchTeaDrinks.fulfilled.match, (state, action) => {
            state.isLoading = false
            state.productTea = action.payload
        })
        builder.addMatcher(fetchTeaDrinks.rejected.match, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})
