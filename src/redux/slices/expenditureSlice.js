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
    createExpenditureFailure
} = expenditureSlice.actions

export default expenditureSlice.reducer