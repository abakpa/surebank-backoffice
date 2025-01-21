import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    customerAccountDetail:[],
    loading: false,
    error:null,
};

const customerAccountDetailSlice = createSlice({
    name:'customerAccountDetail',
    initialState,
    reducers:{
        fetchCustomerAccountDetailRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerAccountDetailSuccess:(state,action)=>{
            state.customerAccountDetail= action.payload;
            state.loading=false
        },
        fetchCustomerAccountDetailFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchAllCustomerAccountDetailRequest:(state)=>{
            state.loading = true
        },
        fetchAllCustomerAccountDetailSuccess:(state,action)=>{
            state.customerAccountDetail= action.payload;
            state.loading=false
        },
        fetchAllCustomerAccountDetailFailure:(state,action)=>{
            state.error = action.payload
        },
        createCustomerAccountDetailRequest:(state)=>{
            state.loading=true
        },
        createCustomerAccountDetailSuccess:(state,action)=>{
            state.customerAccountDetail.push(action.payload)
            state.loading=false
        },
        createCustomerAccountDetailFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchCustomerAccountDetailRequest,
    fetchCustomerAccountDetailSuccess,
    fetchCustomerAccountDetailFailure,
    fetchAllCustomerAccountDetailRequest,
    fetchAllCustomerAccountDetailSuccess,
    fetchAllCustomerAccountDetailFailure,
    createCustomerAccountDetailRequest,
    createCustomerAccountDetailSuccess,
    createCustomerAccountDetailFailure
} = customerAccountDetailSlice.actions

export default customerAccountDetailSlice.reducer