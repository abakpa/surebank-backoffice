import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fdreport: [],
    branchfdreport: [],
    interestRate:null,
    loading: false,
    error:null,
};

const fdreportSlice = createSlice({
    name:'fdreport',
    initialState,
    reducers:{
        fetchFDRequest:(state)=>{
            state.loading = true
        },
        fetchFDSuccess:(state,action)=>{
            state.fdreport= action.payload;
            state.loading=false
        },
        fetchFDFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchFDRequest:(state)=>{
            state.loading = true
        },
        fetchBranchFDSuccess:(state,action)=>{
            state.branchfdreport= action.payload;
            state.loading=false
        },
        fetchBranchFDFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchInterestRequest:(state)=>{
            state.loading = true
        },
        fetchInterestSuccess:(state,action)=>{
            state.interestRate= action.payload;
            state.loading=false
        },
        fetchInterestFailure:(state,action)=>{
            state.error = action.payload
        },
       createInterestRequest:(state)=>{
            state.loading = true
        },
       createInterestSuccess:(state,action)=>{
            state.interestRate= action.payload;
            state.loading=false
        },
       createInterestFailure:(state,action)=>{
            state.error = action.payload
        },
        updateInterestRequest:(state)=>{
            state.loading = true
        },
        updateInterestSuccess:(state,action)=>{
            state.interestRate= action.payload;
            state.loading=false
        },
        updateInterestFailure:(state,action)=>{
            state.error = action.payload
        }

     }
})

export const {
    fetchFDRequest,
    fetchFDSuccess,
    fetchFDFailure,
    fetchBranchFDRequest,
    fetchBranchFDSuccess,
    fetchBranchFDFailure,
    fetchBranchByIdRequest,
    fetchBranchByIdSuccess,
    fetchBranchByIdFailure,
    fetchInterestRequest,
    fetchInterestSuccess,
    fetchInterestFailure,
   createInterestRequest,
   createInterestSuccess,
   createInterestFailure,
    updateInterestRequest,
    updateInterestSuccess,
    updateInterestFailure,
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure
} = fdreportSlice.actions

export default fdreportSlice.reducer