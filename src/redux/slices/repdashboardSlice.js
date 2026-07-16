import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 
    repdailyds: null,
    repdailyfd: null,
    repdailysb: null,
    reptotaldailysbandds: null,
    repdswithdrawal: null,
    repFWWithdrawal: null,
    repdspackage: null,
    repsbpackage: null,
    reppackages: null,
    fdpackage: null,
    fdcontribution: null,
    reptotalexpenditure: null,
    repEcommerceDeposit: null,
    repEcommerceDSDeposit: null,
    repEcommerceDepositReport: [],
    repEcommerceDSDepositReport: [],
    repFWWithdrawalReport: [],
    loading: false,
    error:null,
    referral:null
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
            state.repdailyfd= action.payload;
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
        fetchRepFWWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchRepFWWithdrawalSuccess:(state,action)=>{
            state.repFWWithdrawal= action.payload;
            state.loading=false
        },
        fetchRepFWWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepFWWithdrawalReportRequest:(state)=>{
            state.loading = true
        },
        fetchRepFWWithdrawalReportSuccess:(state,action)=>{
            state.repFWWithdrawalReport= action.payload;
            state.loading=false
        },
        fetchRepFWWithdrawalReportFailure:(state,action)=>{
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
        fetchRepTotalExpenditureRequest:(state)=>{
            state.loading = true
        },
        fetchRepTotalExpenditureSuccess:(state,action)=>{
            state.reptotalexpenditure= action.payload;
            state.loading=false
        },
        fetchRepTotalExpenditureFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchReferralRequest:(state)=>{
            state.loading = true
        },
        fetchReferralSuccess:(state,action)=>{
            state.referral= action.payload;
            state.loading=false
        },
        fetchReferralFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepEcommerceDepositRequest:(state)=>{
            state.loading = true
        },
        fetchRepEcommerceDepositSuccess:(state,action)=>{
            state.repEcommerceDeposit = action.payload;
            state.loading = false
        },
        fetchRepEcommerceDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepEcommerceDepositReportRequest:(state)=>{
            state.loading = true
        },
        fetchRepEcommerceDepositReportSuccess:(state,action)=>{
            state.repEcommerceDepositReport = action.payload;
            state.loading = false
        },
        fetchRepEcommerceDepositReportFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepEcommerceDSDepositRequest:(state)=>{
            state.loading = true
        },
        fetchRepEcommerceDSDepositSuccess:(state,action)=>{
            state.repEcommerceDSDeposit = action.payload;
            state.loading = false
        },
        fetchRepEcommerceDSDepositFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        },
        fetchRepEcommerceDSDepositReportRequest:(state)=>{
            state.loading = true
        },
        fetchRepEcommerceDSDepositReportSuccess:(state,action)=>{
            state.repEcommerceDSDepositReport = action.payload;
            state.loading = false
        },
        fetchRepEcommerceDSDepositReportFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
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
    fetchRepFWWithdrawalRequest,
    fetchRepFWWithdrawalSuccess,
    fetchRepFWWithdrawalFailure,
    fetchRepFWWithdrawalReportRequest,
    fetchRepFWWithdrawalReportSuccess,
    fetchRepFWWithdrawalReportFailure,
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
    fetchRepTotalExpenditureRequest,
    fetchRepTotalExpenditureSuccess,
    fetchRepTotalExpenditureFailure,
    fetchReferralRequest,
    fetchReferralSuccess,
    fetchReferralFailure,
    fetchRepEcommerceDepositRequest,
    fetchRepEcommerceDepositSuccess,
    fetchRepEcommerceDepositFailure,
    fetchRepEcommerceDepositReportRequest,
    fetchRepEcommerceDepositReportSuccess,
    fetchRepEcommerceDepositReportFailure,
    fetchRepEcommerceDSDepositRequest,
    fetchRepEcommerceDSDepositSuccess,
    fetchRepEcommerceDSDepositFailure,
    fetchRepEcommerceDSDepositReportRequest,
    fetchRepEcommerceDSDepositReportSuccess,
    fetchRepEcommerceDSDepositReportFailure,
 
} = dashboardSlice.actions

export default dashboardSlice.reducer
