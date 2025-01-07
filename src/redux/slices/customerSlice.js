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
        createCustomerRequest:(state)=>{
            state.loading=true
        },
        createCustomerSuccess:(state,action)=>{
            state.customers.push(action.payload)
            state.loading=false
        },
        createCustomerFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchCustomerRequest,fetchCustomerSuccess,fetchCustomerFailure,createCustomerRequest,createCustomerSuccess,createCustomerFailure} = customerSlice.actions

export default customerSlice.reducer