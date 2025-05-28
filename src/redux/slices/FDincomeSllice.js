import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fdincome: [],
    branchfdincome: [],
    loading: false,
    error:null,
};

const fdincomeSlice = createSlice({
    name:'fdincome',
    initialState,
    reducers:{
        fetchFDIncomeRequest:(state)=>{
            state.loading = true
        },
        fetchFDIncomeSuccess:(state,action)=>{
            state.fdincome= action.payload;
            state.loading=false
        },
        fetchFDIncomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchFDIncomeRequest:(state)=>{
            state.loading = true
        },
        fetchBranchFDIncomeSuccess:(state,action)=>{
            state.branchfdincome= action.payload;
            state.loading=false
        },
        fetchBranchFDIncomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchFDIncomeByIdRequest:(state)=>{
            state.loading = true
        },
        fetchFDIncomeByIdSuccess:(state,action)=>{
            state.fdincome= action.payload;
            state.loading=false
        },
        fetchFDIncomeByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        createFDIncomeRequest:(state)=>{
            state.loading=true
        },
        createFDIncomeSuccess:(state,action)=>{
            state.fdincome.push(action.payload)
            state.loading=false
        },
        createFDIncomeFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchFDIncomeRequest,
    fetchFDIncomeSuccess,
    fetchFDIncomeFailure,
    fetchBranchFDIncomeRequest,
    fetchBranchFDIncomeSuccess,
    fetchBranchFDIncomeFailure,
    fetchFDIncomeByIdRequest,
    fetchFDIncomeByIdSuccess,
    fetchFDIncomeByIdFailure,
    createFDIncomeRequest,
    createFDIncomeSuccess,
    createFDIncomeFailure
} = fdincomeSlice.actions

export default fdincomeSlice.reducer