import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    deposit:null,
    loading: false,
    error:null,
};

const depositSlice = createSlice({
    name:'deposit',
    initialState,
    reducers:{
        fetchDepositRequest:(state)=>{
            state.loading = true
        },
        fetchDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        createDepositRequest:(state)=>{
            state.loading=true
        },
        createDepositSuccess:(state,action)=>{
            state.deposit = action.payload
            console.log("LLLL",state.deposit)
            state.loading=false
        },
        createDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchDepositRequest,fetchDepositSuccess,fetchDepositFailure,createDepositRequest,createDepositSuccess,createDepositFailure} = depositSlice.actions

export default depositSlice.reducer