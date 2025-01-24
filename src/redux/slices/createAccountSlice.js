import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customerAccount:null,
    loading: false,
    error:null,
};

const customerAccountSlice = createSlice({
    name:'customerAccount',
    initialState,
    reducers:{
        fetchAllCustomerAccountRequest:(state)=>{
            state.loading = true
        },
        fetchAllCustomerAccountSuccess:(state,action)=>{
            state.customerAccount= action.payload;
            state.loading=false
        },
        fetchAllCustomerAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchAccountTransactionRequest:(state)=>{
            state.loading = true
        },
        fetchAccountTransactionSuccess:(state,action)=>{
            state.customerAccount= action.payload;
            state.loading=false
        },
        fetchAccountTransactionFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerAccountSuccess:(state,action)=>{
            state.customerAccount= action.payload;
            state.loading=false
        },
        fetchCustomerAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerSubAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSubAccountSuccess:(state,action)=>{
            state.customerAccount= action.payload;
            state.loading=false
        },
        fetchCustomerSubAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        createCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerAccountSuccess:(state,action)=>{
            state.customerAccount.push(action.payload)
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
            state.customerAccount.push(action.payload)
            state.loading=false
        },
        editCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchAllCustomerAccountRequest,
    fetchAllCustomerAccountSuccess,
    fetchAllCustomerAccountFailure,
    fetchAccountTransactionRequest,
    fetchAccountTransactionSuccess,
    fetchAccountTransactionFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure
} = customerAccountSlice.actions

export default customerAccountSlice.reducer