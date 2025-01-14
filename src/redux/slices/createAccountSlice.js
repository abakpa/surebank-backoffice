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
        }
    }
})

export const {fetchCustomerAccountRequest,fetchCustomerAccountSuccess,fetchCustomerAccountFailure,createCustomerAccountRequest,createCustomerAccountSuccess,createCustomerAccountFailure} = customerAccountSlice.actions

export default customerAccountSlice.reducer