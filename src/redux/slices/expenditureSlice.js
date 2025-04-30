import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    expenditure: [],
    loading: false,
    error:null,
};

const expenditureSlice = createSlice({
    name:'expenditure',
    initialState,
    reducers:{
        fetchExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchExpenditureSuccess:(state,action)=>{
            state.expenditure= action.payload;
            state.loading=false
        },
        fetchExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchByIdRequest:(state)=>{
            state.loading = true
        },
        fetchBranchByIdSuccess:(state,action)=>{
            state.branches= action.payload;
            state.loading=false
        },
        fetchBranchByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        createExpenditureRequest:(state)=>{
            state.loading=true
        },
        createExpenditureSuccess:(state,action)=>{
            state.expenditure.push(action.payload)
            state.loading=false
        },
        createExpenditureFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createBranchExpenditureRequest:(state)=>{
            state.loading=true
        },
        createBranchExpenditureSuccess:(state,action)=>{
            state.expenditure.push(action.payload)
            state.loading=false
        },
        createBranchExpenditureFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createRepExpenditureRequest:(state)=>{
            state.loading=true
        },
        createRepExpenditureSuccess:(state,action)=>{
            state.expenditure.push(action.payload)
            state.loading=false
        },
        createRepExpenditureFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchExpenditureRequest,
    fetchExpenditureSuccess,
    fetchExpenditureFailure,
    fetchBranchByIdRequest,
    fetchBranchByIdSuccess,
    fetchBranchByIdFailure,
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure,
    createBranchExpenditureRequest,
    createBranchExpenditureSuccess,
    createBranchExpenditureFailure,
    createRepExpenditureRequest,
    createRepExpenditureSuccess,
    createRepExpenditureFailure
} = expenditureSlice.actions

export default expenditureSlice.reducer