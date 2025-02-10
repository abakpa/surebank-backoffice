import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    deposit:null,
    loading: false,
    error:null,
};

const depositSlice = createSlice({
    name:'deposit',
    initialState,
    reducers:{
        fetchDepositRequest:(state)=>{
            state.loading = true
        },
        fetchDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerByIdRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerByIdSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerSubAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSubAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerSubAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSubAccountDepositRequest:(state)=>{
            state.loading = true
        },
        fetchSubAccountDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchSubAccountDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        createDepositRequest:(state)=>{
            state.loading=true
        },
        createDepositSuccess:(state,action)=>{
            state.deposit = action.payload
            console.log("LLLL",state.deposit)
            state.loading=false
        },
        createDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        fetchWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchWithdrawalSuccess:(state,action)=>{
            state.withdrawal= action.payload;
            state.loading=false
        },
        fetchWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        createWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createWithdrawalSuccess:(state,action)=>{
            state.withdrawal=action.payload
            state.loading=false
        },
        createWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createMainWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createMainWithdrawalSuccess:(state,action)=>{
            state.withdrawal=action.payload
            state.loading=false
        },
        createMainWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerAccountSuccess:(state,action)=>{
            state.customerAccount=action.payload
            state.loading=false
        },
        createCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerAccountSuccess:(state,action)=>{
            state.customerAccount=action.payload
            state.loading=false
        },
        editCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        
    }
})

export const {
    fetchDepositRequest,
    fetchDepositSuccess,
    fetchDepositFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,
    fetchSubAccountDepositRequest,
    fetchSubAccountDepositSuccess,
    fetchSubAccountDepositFailure,
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure
} = depositSlice.actions

export default depositSlice.reducer