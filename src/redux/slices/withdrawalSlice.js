import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    withdrawal:null,
    loading: false,
    error:null,
};

const withdrawalSlice = createSlice({
    name:'withdrawal',
    initialState,
    reducers:{
        fetchWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchWithdrawalSuccess:(state,action)=>{
            state.withdrawal= action.payload;
            state.loading=false
        },
        fetchWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        createWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createWithdrawalSuccess:(state,action)=>{
            state.withdrawal=action.payload
            state.loading=false
        },
        createWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createMainWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createMainWithdrawalSuccess:(state,action)=>{
            state.withdrawal=action.payload
            state.loading=false
        },
        createMainWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure
} = withdrawalSlice.actions

export default withdrawalSlice.reducer