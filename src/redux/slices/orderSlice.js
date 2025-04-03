import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    order: [],
    loading: false,
    error:null,
};

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        fetchOrderRequest:(state)=>{
            state.loading = true
        },
        fetchOrderSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderFailure:(state,action)=>{
            state.error = action.payload
        }

     }
})

export const {
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderFailure,
 
} = orderSlice.actions

export default orderSlice.reducer