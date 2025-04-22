import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dscontribution: null,
    sbcontribution: null,
    fdcontribution: null,
    fdinterestincome: null,
    fdinterestexpense: null,
    totalsbandds: null,
    dailyds: null,
    dailysb: null,
    totaldailysbandds: null,
    dswithdrawal: null,
    dspackage: null,
    sbpackage: null,
    fdpackage: null,
    packages: null,
    dsincome: null,
    sbincome: null,
    totalincome: null,
    totalexpenditure: null,
    profit: null,
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
        fetchFDContributionRequest:(state)=>{
            state.loading = true
        },
        fetchFDContributionSuccess:(state,action)=>{
            state.fdcontribution= action.payload;
            state.loading=false
        },
        fetchFDContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchFDInterestIncomeRequest:(state)=>{
            state.loading = true
        },
        fetchFDInterestIncomeSuccess:(state,action)=>{
            state.fdinterestincome= action.payload;
            state.loading=false
        },
        fetchFDInterestIncomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchFDInterestExpenseRequest:(state)=>{
            state.loading = true
        },
        fetchFDInterestExpenseSuccess:(state,action)=>{
            state.fdinterestexpense= action.payload;
            state.loading=false
        },
        fetchFDInterestExpenseFailure:(state,action)=>{
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
        fetchFDpackageRequest:(state)=>{
            state.loading = true
        },
        fetchFDpackageSuccess:(state,action)=>{
            state.fdpackage= action.payload;
            state.loading=false
        },
        fetchFDpackageFailure:(state,action)=>{
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
        fetchTotalincomeFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchTotalExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchTotalExpenditureSuccess:(state,action)=>{
            state.totalexpenditure= action.payload;
            state.loading=false
        },
        fetchTotalExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchTotalProfitRequest:(state)=>{
            state.loading = true
        },
        fetchTotalProfitSuccess:(state,action)=>{
            state.profit= action.payload;
            state.loading=false
        },
        fetchTotalProfitFailure:(state,action)=>{
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
    fetchFDContributionRequest,
    fetchFDContributionSuccess,
    fetchFDContributionFailure,
    fetchFDInterestIncomeRequest,
    fetchFDInterestIncomeSuccess,
    fetchFDInterestIncomeFailure,
    fetchFDInterestExpenseRequest,
    fetchFDInterestExpenseSuccess,
    fetchFDInterestExpenseFailure,
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
    fetchFDpackageRequest,
    fetchFDpackageSuccess,
    fetchFDpackageFailure,
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
    fetchTotalExpenditureRequest,
    fetchTotalExpenditureSuccess,
    fetchTotalExpenditureFailure,
    fetchTotalProfitRequest,
    fetchTotalProfitSuccess,
    fetchTotalProfitFailure,
 
} = dashboardSlice.actions

export default dashboardSlice.reducer