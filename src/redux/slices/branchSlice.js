import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    branches: [],
    loading: false,
    error:null,
};

const branchSlice = createSlice({
    name:'branches',
    initialState,
    reducers:{
        fetchBranchRequest:(state)=>{
            state.loading = true
        },
        fetchBranchSuccess:(state,action)=>{
            state.branches= action.payload;
            state.loading=false
        },
        fetchBranchFailure:(state,action)=>{
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
        createBranchRequest:(state)=>{
            state.loading=true
        },
        createBranchSuccess:(state,action)=>{
            state.branches.push(action.payload)
            state.loading=false
        },
        createBranchFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchBranchRequest,
    fetchBranchSuccess,
    fetchBranchFailure,
    fetchBranchByIdRequest,
    fetchBranchByIdSuccess,
    fetchBranchByIdFailure,
    createBranchRequest,
    createBranchSuccess,
    createBranchFailure
} = branchSlice.actions

export default branchSlice.reducer