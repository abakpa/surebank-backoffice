import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    transaction: [],
    loading: false,
    error:null,
};

const transactionSlice = createSlice({
    name:'transaction',
    initialState,
    reducers:{
        fetchTransactionRequest:(state)=>{
            state.loading = true
        },
        fetchTransactionSuccess:(state,action)=>{
            state.transaction= action.payload;
            state.loading=false
        },
        fetchTransactionFailure:(state,action)=>{
            state.error = action.payload
        }

     }
})

export const {
    fetchTransactionRequest,
    fetchTransactionSuccess,
    fetchTransactionFailure,
 
} = transactionSlice.actions

export default transactionSlice.reducer