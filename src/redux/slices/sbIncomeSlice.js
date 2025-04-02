import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    sbincome: [],
    loading: false,
    error:null,
};

const sbincomeSlice = createSlice({
    name:'sbincome',
    initialState,
    reducers:{
        fetchSBIncomeRequest:(state)=>{
            state.loading = true
        },
        fetchSBIncomeSuccess:(state,action)=>{
            state.sbincome= action.payload;
            state.loading=false
        },
        fetchSBIncomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSBIncomeByIdRequest:(state)=>{
            state.loading = true
        },
        fetchSBIncomeByIdSuccess:(state,action)=>{
            state.sbincome= action.payload;
            state.loading=false
        },
        fetchSBIncomeByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        createSBIncomeRequest:(state)=>{
            state.loading=true
        },
        createSBIncomeSuccess:(state,action)=>{
            state.sbincome.push(action.payload)
            state.loading=false
        },
        createSBIncomeFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchSBIncomeRequest,
    fetchSBIncomeSuccess,
    fetchSBIncomeFailure,
    fetchSBIncomeByIdRequest,
    fetchSBIncomeByIdSuccess,
    fetchSBIncomeByIdFailure,
    createSBIncomeRequest,
    createSBIncomeSuccess,
    createSBIncomeFailure
} = sbincomeSlice.actions

export default sbincomeSlice.reducer