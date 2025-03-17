import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dashboard: [],
    loading: false,
    error:null,
};

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        fetchDSContributionRequest:(state)=>{
            state.loading = true
        },
        fetchDSContributionSuccess:(state,action)=>{
            state.dashboard= action.payload;
            state.loading=false
        },
        fetchDSContributionFailure:(state,action)=>{
            state.error = action.payload
        },
    
    }
})

export const {
    fetchDSContributionRequest,
    fetchDSContributionSuccess,
    fetchDSContributionFailure,
} = dashboardSlice.actions

export default dashboardSlice.reducer