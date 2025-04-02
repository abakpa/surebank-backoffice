import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dsincome: [],
    loading: false,
    error:null,
};

const dsincomeSlice = createSlice({
    name:'dsincome',
    initialState,
    reducers:{
        fetchDSIncomeRequest:(state)=>{
            state.loading = true
        },
        fetchDSIncomeSuccess:(state,action)=>{
            state.dsincome= action.payload;
            state.loading=false
        },
        fetchDSIncomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDSIncomeByIdRequest:(state)=>{
            state.loading = true
        },
        fetchDSIncomeByIdSuccess:(state,action)=>{
            state.dsincome= action.payload;
            state.loading=false
        },
        fetchDSIncomeByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        createDSIncomeRequest:(state)=>{
            state.loading=true
        },
        createDSIncomeSuccess:(state,action)=>{
            state.dsincome.push(action.payload)
            state.loading=false
        },
        createDSIncomeFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchDSIncomeRequest,
    fetchDSIncomeSuccess,
    fetchDSIncomeFailure,
    fetchDSIncomeByIdRequest,
    fetchDSIncomeByIdSuccess,
    fetchDSIncomeByIdFailure,
    createDSIncomeRequest,
    createDSIncomeSuccess,
    createDSIncomeFailure
} = dsincomeSlice.actions

export default dsincomeSlice.reducer