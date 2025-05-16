import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 
    repdailyds: null,
    branchstaff:null,
    repdailysb: null,
    reptotaldailysbandds: null,
    repdswithdrawal: null,
    repdspackage: null,
    repsbpackage: null,
    reppackages: null,
    fdpackage: null,
    fdcontribution: null,
    reptotalexpenditure: null,
    transaction:null,
    loading: false,
    error:null,
};

const managerviewrepdashboardSlice = createSlice({
    name:'managerviewrepdashboard',
    initialState,
    reducers:{
    
        fetchMVRepDSDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepDSDailyContributionSuccess:(state,action)=>{
            state.repdailyds= action.payload;
            state.loading=false
        },
        fetchMVRepDSDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchStaffRequest:(state)=>{
            state.loading = true
        },
        fetchBranchStaffSuccess:(state,action)=>{
            state.branchstaff= action.payload;
            state.loading=false
        },
        fetchBranchStaffFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepSBDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepSBDailyContributionSuccess:(state,action)=>{
            state.repdailysb= action.payload;
            state.loading=false
        },
        fetchMVRepSBDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepFDDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepFDDailyContributionSuccess:(state,action)=>{
            state.fdcontribution= action.payload;
            state.loading=false
        },
        fetchMVRepFDDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepTotalSBandDSDailyRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepTotalSBandDSDailySuccess:(state,action)=>{
            state.reptotaldailysbandds= action.payload;
            state.loading=false
        },
        fetchMVRepTotalSBandDSDailyFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepDSWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepDSWithdrawalSuccess:(state,action)=>{
            state.repdswithdrawal= action.payload;
            state.loading=false
        },
        fetchMVRepDSWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepDSpackageRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepDSpackageSuccess:(state,action)=>{
            state.repdspackage= action.payload;
            state.loading=false
        },
        fetchMVRepDSpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepSBpackageRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepSBpackageSuccess:(state,action)=>{
            state.repsbpackage= action.payload;
            state.loading=false
        },
        fetchMVRepSBpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepFDpackageRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepFDpackageSuccess:(state,action)=>{
            state.fdpackage= action.payload;
            state.loading=false
        },
        fetchMVRepFDpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepPackageRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepPackageSuccess:(state,action)=>{
            state.reppackages= action.payload;
            state.loading=false
        },
        fetchMVRepPackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVRepTotalExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchMVRepTotalExpenditureSuccess:(state,action)=>{
            state.reptotalexpenditure= action.payload;
            state.loading=false
        },
        fetchMVRepTotalExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchMVTransactionRequest:(state)=>{
            state.loading = true
        },
        fetchMVTransactionSuccess:(state,action)=>{
            state.transaction= action.payload;
            state.loading=false
        },
        fetchMVTransactionFailure:(state,action)=>{
            state.error = action.payload
        }
        
    }
})

export const {
  
    fetchMVRepDSDailyContributionRequest,
    fetchMVRepDSDailyContributionSuccess,
    fetchMVRepDSDailyContributionFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    fetchMVRepSBDailyContributionRequest,
    fetchMVRepSBDailyContributionSuccess,
    fetchMVRepSBDailyContributionFailure,
    fetchMVRepFDDailyContributionRequest,
    fetchMVRepFDDailyContributionSuccess,
    fetchMVRepFDDailyContributionFailure,
    fetchMVRepTotalSBandDSDailyRequest,
    fetchMVRepTotalSBandDSDailySuccess,
    fetchMVRepTotalSBandDSDailyFailure,
    fetchMVRepDSWithdrawalRequest,
    fetchMVRepDSWithdrawalSuccess,
    fetchMVRepDSWithdrawalFailure,
    fetchMVRepDSpackageRequest,
    fetchMVRepDSpackageSuccess,
    fetchMVRepDSpackageFailure,
    fetchMVRepSBpackageRequest,
    fetchMVRepSBpackageSuccess,
    fetchMVRepSBpackageFailure,
    fetchMVRepFDpackageRequest,
    fetchMVRepFDpackageSuccess,
    fetchMVRepFDpackageFailure,
    fetchMVRepPackageRequest,
    fetchMVRepPackageSuccess,
    fetchMVRepPackageFailure,
    fetchMVRepTotalExpenditureRequest,
    fetchMVRepTotalExpenditureSuccess,
    fetchMVRepTotalExpenditureFailure,
    fetchMVTransactionRequest,
    fetchMVTransactionSuccess,
    fetchMVTransactionFailure,
 
} = managerviewrepdashboardSlice.actions

export default managerviewrepdashboardSlice.reducer