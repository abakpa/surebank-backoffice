import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staffs: [],
    loading: false,
    error:null,
};

const staffSlice = createSlice({
    name:'staffs',
    initialState,
    reducers:{
        fetchStaffRequest:(state)=>{
            state.loading = true
        },
        fetchStaffSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
        fetchStaffFailure:(state,action)=>{
            state.error = action.payload
        },
        createStaffRequest:(state)=>{
            state.loading=true
        },
        createStaffSuccess:(state,action)=>{
            state.staffs.push(action.payload)
            state.loading=false
        },
        createStaffFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchStaffRequest,fetchStaffSuccess,fetchStaffFailure,createStaffRequest,createStaffSuccess,createStaffFailure} = staffSlice.actions

export default staffSlice.reducer