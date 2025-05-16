import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customers: [],
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
            state.customers= action.payload;
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
        }
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
    createCustomerFailure
} = customerSlice.actions

export default customerSlice.reducer