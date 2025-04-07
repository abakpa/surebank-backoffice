import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    expenditurereport: [],
    branchexpenditurereport: [],
    loading: false,
    error:null,
};

const expenditurereportSlice = createSlice({
    name:'expenditurereport',
    initialState,
    reducers:{
        fetchExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchExpenditureSuccess:(state,action)=>{
            state.expenditurereport= action.payload;
            state.loading=false
        },
        fetchExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchBranchExpenditureSuccess:(state,action)=>{
            state.branchexpenditurereport= action.payload;
            state.loading=false
        },
        fetchBranchExpenditureFailure:(state,action)=>{
            state.error = action.payload
        }

     }
})

export const {
    fetchExpenditureRequest,
    fetchExpenditureSuccess,
    fetchExpenditureFailure,
    fetchBranchExpenditureRequest,
    fetchBranchExpenditureSuccess,
    fetchBranchExpenditureFailure,
    fetchBranchByIdRequest,
    fetchBranchByIdSuccess,
    fetchBranchByIdFailure,
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure
} = expenditurereportSlice.actions

export default expenditurereportSlice.reducer