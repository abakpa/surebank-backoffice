import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    branchdscontribution: null,
    branchsbcontribution: null,
    branchtotalsbandds: null,
    branchdailyds: null,
    branchdailysb: null,
    branchtotaldailysbandds: null,
    branchdswithdrawal: null,
    branchdspackage: null,
    branchsbpackage: null,
    branchpackages: null,
    branchdsincome: null,
    branchsbincome: null,
    branchtotalincome: null,
    branchtotalexpenditure: null,
    branchprofit: null,
    loading: false,
    error:null,
};

const dashboardSlice = createSlice({
    name:'managerdashboard',
    initialState,
    reducers:{
        fetchBranchDSContributionRequest:(state)=>{
            state.loading = true
        },
        fetchBranchDSContributionSuccess:(state,action)=>{
            state.branchdscontribution= action.payload;
            state.loading=false
        },
        fetchBranchDSContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchSBContributionRequest:(state)=>{
            state.loading = true
        },
        fetchBranchSBContributionSuccess:(state,action)=>{
            state.branchsbcontribution= action.payload;
            state.loading=false
        },
        fetchBranchSBContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetcBranchTotalSBandDSRequest:(state)=>{
            state.loading = true
        },
        fetcBranchTotalSBandDSSuccess:(state,action)=>{
            state.branchtotalsbandds= action.payload;
            state.loading=false
        },
        fetcBranchTotalSBandDSFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchDSDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchBranchDSDailyContributionSuccess:(state,action)=>{
            state.branchdailyds= action.payload;
            state.loading=false
        },
        fetchBranchDSDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchSBDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchBranchSBDailyContributionSuccess:(state,action)=>{
            state.branchdailysb= action.payload;
            state.loading=false
        },
        fetchBranchSBDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchTotalSBandDSDailyRequest:(state)=>{
            state.loading = true
        },
        fetchBranchTotalSBandDSDailySuccess:(state,action)=>{
            state.branchtotaldailysbandds= action.payload;
            state.loading=false
        },
        fetchBranchTotalSBandDSDailyFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchDSWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchBranchDSWithdrawalSuccess:(state,action)=>{
            state.branchdswithdrawal= action.payload;
            state.loading=false
        },
        fetchBranchDSWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchDSpackageRequest:(state)=>{
            state.loading = true
        },
        fetchBranchDSpackageSuccess:(state,action)=>{
            state.branchdspackage= action.payload;
            state.loading=false
        },
        fetchBranchDSpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchSBpackageRequest:(state)=>{
            state.loading = true
        },
        fetchBranchSBpackageSuccess:(state,action)=>{
            state.branchsbpackage= action.payload;
            state.loading=false
        },
        fetchBranchSBpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchPackageRequest:(state)=>{
            state.loading = true
        },
        fetchBranchPackageSuccess:(state,action)=>{
            state.branchpackages= action.payload;
            state.loading=false
        },
        fetchBranchPackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchDSincomeRequest:(state)=>{
            state.loading = true
        },
        fetchBranchDSincomeSuccess:(state,action)=>{
            state.branchdsincome= action.payload;
            state.loading=false
        },
        fetchBranchDSFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchSBincomeRequest:(state)=>{
            state.loading = true
        },
        fetchBranchSBincomeSuccess:(state,action)=>{
            state.branchsbincome= action.payload;
            state.loading=false
        },
        fetchBranchSBFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchTotalincomeRequest:(state)=>{
            state.loading = true
        },
        fetchBranchTotalincomeSuccess:(state,action)=>{
            state.branchtotalincome= action.payload;
            state.loading=false
        },
        fetchBranchTotalincomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchTotalExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchBranchTotalExpenditureSuccess:(state,action)=>{
            state.branchtotalexpenditure= action.payload;
            state.loading=false
        },
        fetchBranchTotalExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchTotalProfitRequest:(state)=>{
            state.loading = true
        },
        fetchBranchTotalProfitSuccess:(state,action)=>{
            state.branchprofit= action.payload;
            state.loading=false
        },
        fetchBranchTotalProfitFailure:(state,action)=>{
            state.error = action.payload
        },
    
    }
})

export const {
    fetchBranchDSContributionRequest,
    fetchBranchDSContributionSuccess,
    fetchBranchDSContributionFailure,
    fetchBranchSBContributionRequest,
    fetchBranchSBContributionSuccess,
    fetchBranchSBContributionFailure,
    fetcBranchTotalSBandDSRequest,
    fetcBranchTotalSBandDSSuccess,
    fetcBranchTotalSBandDSFailure,
    fetchBranchDSDailyContributionRequest,
    fetchBranchDSDailyContributionSuccess,
    fetchBranchDSDailyContributionFailure,
    fetchBranchSBDailyContributionRequest,
    fetchBranchSBDailyContributionSuccess,
    fetchBranchSBDailyContributionFailure,
    fetchBranchTotalSBandDSDailyRequest,
    fetchBranchTotalSBandDSDailySuccess,
    fetchBranchTotalSBandDSDailyFailure,
    fetchBranchDSWithdrawalRequest,
    fetchBranchDSWithdrawalSuccess,
    fetchBranchDSWithdrawalFailure,
    fetchBranchDSpackageRequest,
    fetchBranchDSpackageSuccess,
    fetchBranchDSpackageFailure,
    fetchBranchSBpackageRequest,
    fetchBranchSBpackageSuccess,
    fetchBranchSBpackageFailure,
    fetchBranchPackageRequest,
    fetchBranchPackageSuccess,
    fetchBranchPackageFailure,
    fetchBranchDSincomeRequest,
    fetchBranchDSincomeSuccess,
    fetchBranchDSincomeFailure,
    fetchBranchSBincomeRequest,
    fetchBranchSBincomeSuccess,
    fetchBranchSBincomeFailure,
    fetchBranchTotalincomeRequest,
    fetchBranchTotalincomeSuccess,
    fetchBranchTotalincomeFailure,
    fetchBranchTotalExpenditureRequest,
    fetchBranchTotalExpenditureSuccess,
    fetchBranchTotalExpenditureFailure,
    fetchBranchTotalProfitRequest,
    fetchBranchTotalProfitSuccess,
    fetchBranchTotalProfitFailure,
 
} = dashboardSlice.actions

export default dashboardSlice.reducer