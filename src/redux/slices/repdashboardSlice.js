import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 
    repdailyds: null,
    repdailysb: null,
    reptotaldailysbandds: null,
    repdswithdrawal: null,
    repdspackage: null,
    repsbpackage: null,
    reppackages: null,
    fdpackage: null,
    fdcontribution: null,
    loading: false,
    error:null,
};

const dashboardSlice = createSlice({
    name:'repdashboard',
    initialState,
    reducers:{
    
        fetchRepDSDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchRepDSDailyContributionSuccess:(state,action)=>{
            state.repdailyds= action.payload;
            state.loading=false
        },
        fetchRepDSDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepSBDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchRepSBDailyContributionSuccess:(state,action)=>{
            state.repdailysb= action.payload;
            state.loading=false
        },
        fetchRepSBDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepFDDailyContributionRequest:(state)=>{
            state.loading = true
        },
        fetchRepFDDailyContributionSuccess:(state,action)=>{
            state.fdcontribution= action.payload;
            state.loading=false
        },
        fetchRepFDDailyContributionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepTotalSBandDSDailyRequest:(state)=>{
            state.loading = true
        },
        fetchRepTotalSBandDSDailySuccess:(state,action)=>{
            state.reptotaldailysbandds= action.payload;
            state.loading=false
        },
        fetchRepTotalSBandDSDailyFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepDSWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchRepDSWithdrawalSuccess:(state,action)=>{
            state.repdswithdrawal= action.payload;
            state.loading=false
        },
        fetchRepDSWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepDSpackageRequest:(state)=>{
            state.loading = true
        },
        fetchRepDSpackageSuccess:(state,action)=>{
            state.repdspackage= action.payload;
            state.loading=false
        },
        fetchRepDSpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepSBpackageRequest:(state)=>{
            state.loading = true
        },
        fetchRepSBpackageSuccess:(state,action)=>{
            state.repsbpackage= action.payload;
            state.loading=false
        },
        fetchRepSBpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepFDpackageRequest:(state)=>{
            state.loading = true
        },
        fetchRepFDpackageSuccess:(state,action)=>{
            state.fdpackage= action.payload;
            state.loading=false
        },
        fetchRepFDpackageFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepPackageRequest:(state)=>{
            state.loading = true
        },
        fetchRepPackageSuccess:(state,action)=>{
            state.reppackages= action.payload;
            state.loading=false
        },
        fetchRepPackageFailure:(state,action)=>{
            state.error = action.payload
        },
   
    
    }
})

export const {
  
    fetchRepDSDailyContributionRequest,
    fetchRepDSDailyContributionSuccess,
    fetchRepDSDailyContributionFailure,
    fetchRepSBDailyContributionRequest,
    fetchRepSBDailyContributionSuccess,
    fetchRepSBDailyContributionFailure,
    fetchRepFDDailyContributionRequest,
    fetchRepFDDailyContributionSuccess,
    fetchRepFDDailyContributionFailure,
    fetchRepTotalSBandDSDailyRequest,
    fetchRepTotalSBandDSDailySuccess,
    fetchRepTotalSBandDSDailyFailure,
    fetchRepDSWithdrawalRequest,
    fetchRepDSWithdrawalSuccess,
    fetchRepDSWithdrawalFailure,
    fetchRepDSpackageRequest,
    fetchRepDSpackageSuccess,
    fetchRepDSpackageFailure,
    fetchRepSBpackageRequest,
    fetchRepSBpackageSuccess,
    fetchRepSBpackageFailure,
    fetchRepFDpackageRequest,
    fetchRepFDpackageSuccess,
    fetchRepFDpackageFailure,
    fetchRepPackageRequest,
    fetchRepPackageSuccess,
    fetchRepPackageFailure,
 
 
} = dashboardSlice.actions

export default dashboardSlice.reducer