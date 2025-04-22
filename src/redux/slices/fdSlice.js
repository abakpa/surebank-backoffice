import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fdreport: [],
    branchfdreport: [],
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
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure
} = fdreportSlice.actions

export default fdreportSlice.reducer