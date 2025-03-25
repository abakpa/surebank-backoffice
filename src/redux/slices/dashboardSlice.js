import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dscontribution: null,
    sbcontribution: null,
    totalsbandds: null,
    dailyds: null,
    dailysb: null,
    totaldailysbandds: null,
    dswithdrawal: null,
    dspackage: null,
    sbpackage: null,
    packages: null,
    dsincome: null,
    sbincome: null,
    totalincome: null,
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
            state.dscontribution= action.payload;
            state.loading=false
        },
        fetchDSContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSBContributionRequest:(state)=>{
            state.loading = true
        },
        fetchSBContributionSuccess:(state,action)=>{
            state.sbcontribution= action.payload;
            state.loading=false
        },
        fetchSBContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetcTotalSBandDSRequest:(state)=>{
            state.loading = true
        },
        fetcTotalSBandDSSuccess:(state,action)=>{
            state.totalsbandds= action.payload;
            state.loading=false
        },
        fetcTotalSBandDSFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDSDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchDSDailyContributionSuccess:(state,action)=>{
            state.dailyds= action.payload;
            state.loading=false
        },
        fetchDSDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSBDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchSBDailyContributionSuccess:(state,action)=>{
            state.dailysb= action.payload;
            state.loading=false
        },
        fetchSBDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchTotalSBandDSDailyRequest:(state)=>{
            state.loading = true
        },
        fetchTotalSBandDSDailySuccess:(state,action)=>{
            state.totaldailysbandds= action.payload;
            state.loading=false
        },
        fetchTotalSBandDSDailyFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDSWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchDSWithdrawalSuccess:(state,action)=>{
            state.dswithdrawal= action.payload;
            state.loading=false
        },
        fetchDSWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDSpackageRequest:(state)=>{
            state.loading = true
        },
        fetchDSpackageSuccess:(state,action)=>{
            state.dspackage= action.payload;
            state.loading=false
        },
        fetchDSpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSBpackageRequest:(state)=>{
            state.loading = true
        },
        fetchSBpackageSuccess:(state,action)=>{
            state.sbpackage= action.payload;
            state.loading=false
        },
        fetchSBpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchPackageRequest:(state)=>{
            state.loading = true
        },
        fetchPackageSuccess:(state,action)=>{
            state.packages= action.payload;
            state.loading=false
        },
        fetchPackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDSincomeRequest:(state)=>{
            state.loading = true
        },
        fetchDSincomeSuccess:(state,action)=>{
            state.dsincome= action.payload;
            state.loading=false
        },
        fetchDSFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSBincomeRequest:(state)=>{
            state.loading = true
        },
        fetchSBincomeSuccess:(state,action)=>{
            state.sbincome= action.payload;
            state.loading=false
        },
        fetchSBFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchTotalincomeRequest:(state)=>{
            state.loading = true
        },
        fetchTotalincomeSuccess:(state,action)=>{
            state.totalincome= action.payload;
            state.loading=false
        },
        fetchTotalFailure:(state,action)=>{
            state.error = action.payload
        },
    
    }
})

export const {
    fetchDSContributionRequest,
    fetchDSContributionSuccess,
    fetchDSContributionFailure,
    fetchSBContributionRequest,
    fetchSBContributionSuccess,
    fetchSBContributionFailure,
    fetcTotalSBandDSRequest,
    fetcTotalSBandDSSuccess,
    fetcTotalSBandDSFailure,
    fetchDSDailyContributionRequest,
    fetchDSDailyContributionSuccess,
    fetchDSDailyContributionFailure,
    fetchSBDailyContributionRequest,
    fetchSBDailyContributionSuccess,
    fetchSBDailyContributionFailure,
    fetchTotalSBandDSDailyRequest,
    fetchTotalSBandDSDailySuccess,
    fetchTotalSBandDSDailyFailure,
    fetchDSWithdrawalRequest,
    fetchDSWithdrawalSuccess,
    fetchDSWithdrawalFailure,
    fetchDSpackageRequest,
    fetchDSpackageSuccess,
    fetchDSpackageFailure,
    fetchSBpackageRequest,
    fetchSBpackageSuccess,
    fetchSBpackageFailure,
    fetchPackageRequest,
    fetchPackageSuccess,
    fetchPackageFailure,
    fetchDSincomeRequest,
    fetchDSincomeSuccess,
    fetchDSincomeFailure,
    fetchSBincomeRequest,
    fetchSBincomeSuccess,
    fetchSBincomeFailure,
    fetchTotalincomeRequest,
    fetchTotalincomeSuccess,
    fetchTotalincomeFailure,
 
} = dashboardSlice.actions

export default dashboardSlice.reducer