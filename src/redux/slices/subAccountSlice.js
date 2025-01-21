import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    subAccount:[],
    loading: false,
    error:null,
};

const subAccountSlice = createSlice({
    name:'subAccount',
    initialState,
    reducers:{
        fetchCustomerSubAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSubAccountSuccess:(state,action)=>{
            state.subAccount= action.payload;
            state.loading=false
        },
        fetchCustomerSubAccountFailure:(state,action)=>{
            state.error = action.payload
        },
    
    }
})

export const {

    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,
   
} = subAccountSlice.actions

export default subAccountSlice.reducer