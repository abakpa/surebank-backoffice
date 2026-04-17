import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    order: [],
    orderItems: [],
    orderPagination: {
        total: 0,
        page: 1,
        limit: 25,
        totalPages: 1,
    },
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
            state.orderItems = action.payload.items || [];
            state.orderPagination = {
                total: action.payload.total || 0,
                page: action.payload.page || 1,
                limit: action.payload.limit || 25,
                totalPages: action.payload.totalPages || 1,
            };
            state.loading=false
        },
        fetchOrderFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
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
            state.loading = false
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
            state.loading = false
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
