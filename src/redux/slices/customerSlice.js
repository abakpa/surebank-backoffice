import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customers: [],
    branchcustomers: [],
    loading: false,
    error:null,
};

const customerSlice = createSlice({
    name:'customers',
    initialState,
    reducers:{
        fetchCustomerRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchCustomerFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerLoginCountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerLoginCountSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchCustomerLoginCountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchCustomerLoginCountRequest:(state)=>{
            state.loading = true
        },
        fetchBranchCustomerLoginCountSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchBranchCustomerLoginCountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepCustomerLoginCountRequest:(state)=>{
            state.loading = true
        },
        fetchRepCustomerLoginCountSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchRepCustomerLoginCountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerWithdrawalRequestRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerWithdrawalRequestSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchCustomerWithdrawalRequestFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchCustomerWithdrawalRequestRequest:(state)=>{
            state.loading = true
        },
        fetchBranchCustomerWithdrawalRequestSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchBranchCustomerWithdrawalRequestFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepCustomerWithdrawalRequestRequest:(state)=>{
            state.loading = true
        },
        fetchRepCustomerWithdrawalRequestSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchRepCustomerWithdrawalRequestFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchBranchCustomerRequest:(state)=>{
            state.loading = true
        },
        fetchBranchCustomerSuccess:(state,action)=>{
            state.branchcustomers= action.payload;
            state.loading=false
        },
        fetchBranchCustomerFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchRepCustomerRequest:(state)=>{
            state.loading = true
        },
        fetchRepCustomerSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchRepCustomerFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerByIdRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerByIdSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
        fetchCustomerByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        createCustomerRequest:(state)=>{
            state.loading=true
        },
        createCustomerSuccess:(state,action)=>{
            state.customers=action.payload
            state.loading=false
        },
        createCustomerFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
      transferAllCustomerRequest:(state)=>{
            state.loading = true
        },
      transferAllCustomerSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
      transferAllCustomerFailure:(state,action)=>{
            state.error = action.payload
        },
      transferCustomerRequest:(state)=>{
            state.loading = true
        },
      transferCustomerSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
      transferCustomerFailure:(state,action)=>{
            state.error = action.payload
        },
        resetCustomerPasswordRequest:(state)=>{
            state.loading = true
        },
       resetCustomerPasswordSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
       resetCustomerPasswordFailure:(state,action)=>{
            state.error = action.payload
        },
        updatePasswordRequest:(state)=>{
            state.loading = true
        },
       updatePasswordSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
       updatePasswordFailure:(state,action)=>{
            state.error = action.payload
        },
        updateCustomerWithdrawalRequestRequest:(state)=>{
            state.loading = true
        },
       updateCustomerWithdrawalRequestSuccess:(state,action)=>{
            state.customers= action.payload;
            state.loading=false
        },
       updateCustomerWithdrawalRequestFailure:(state,action)=>{
            state.error = action.payload
            state.loading=false
        },
 
    }
})

export const {
    fetchCustomerRequest,
    fetchCustomerSuccess,
    fetchCustomerFailure,
    fetchCustomerLoginCountRequest,
    fetchCustomerLoginCountSuccess,
    fetchCustomerLoginCountFailure,
    fetchBranchCustomerLoginCountRequest,
    fetchBranchCustomerLoginCountSuccess,
    fetchBranchCustomerLoginCountFailure,
    fetchRepCustomerLoginCountRequest,
    fetchRepCustomerLoginCountSuccess,
    fetchRepCustomerLoginCountFailure,
    fetchCustomerWithdrawalRequestRequest,
    fetchCustomerWithdrawalRequestSuccess,
    fetchCustomerWithdrawalRequestFailure,
    fetchBranchCustomerWithdrawalRequestRequest,
    fetchBranchCustomerWithdrawalRequestSuccess,
    fetchBranchCustomerWithdrawalRequestFailure,
    fetchRepCustomerWithdrawalRequestRequest,
    fetchRepCustomerWithdrawalRequestSuccess,
    fetchRepCustomerWithdrawalRequestFailure,
    fetchBranchCustomerRequest,
    fetchBranchCustomerSuccess,
    fetchBranchCustomerFailure,
    fetchRepCustomerRequest,
    fetchRepCustomerSuccess,
    fetchRepCustomerFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    createCustomerRequest,
    createCustomerSuccess,
    createCustomerFailure,
    transferAllCustomerRequest,
    transferAllCustomerSuccess,
    transferAllCustomerFailure,
    transferCustomerRequest,
    transferCustomerSuccess,
    transferCustomerFailure,
    resetCustomerPasswordRequest,
    resetCustomerPasswordSuccess,
    resetCustomerPasswordFailure,
    updatePasswordRequest,
   updatePasswordSuccess,
   updatePasswordFailure,
    updateCustomerWithdrawalRequestRequest,
   updateCustomerWithdrawalRequestSuccess,
   updateCustomerWithdrawalRequestFailure,
   
} = customerSlice.actions

export default customerSlice.reducer