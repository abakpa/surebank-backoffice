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
 
    }
})

export const {
    fetchCustomerRequest,
    fetchCustomerSuccess,
    fetchCustomerFailure,
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
   
} = customerSlice.actions

export default customerSlice.reducer