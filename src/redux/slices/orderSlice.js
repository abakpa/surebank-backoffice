import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    order: [],
    branchorder: [],
    reporder: [],
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
        },
        fetchBranchOrderRequest:(state)=>{
            state.loading = true
        },
        fetchBranchOrderSuccess:(state,action)=>{
            state.branchorder= action.payload;
            state.loading=false
        },
        fetchBranchOrderFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepOrderRequest:(state)=>{
            state.loading = true
        },
        fetchRepOrderSuccess:(state,action)=>{
            state.reporder= action.payload;
            state.loading=false
        },
        fetchRepOrderFailure:(state,action)=>{
            state.error = action.payload
        }

     }
})

export const {
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderFailure,
    fetchBranchOrderRequest,
    fetchBranchOrderSuccess,
    fetchBranchOrderFailure,
    fetchRepOrderRequest,
    fetchRepOrderSuccess,
    fetchRepOrderFailure,
 
} = orderSlice.actions

export default orderSlice.reducer