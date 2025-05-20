import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staffs: [],
    branchstaffs: [],
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
        fetchBranchStaffRequest:(state)=>{
            state.loading = true
        },
        fetchBranchStaffSuccess:(state,action)=>{
            state.branchstaffs= action.payload;
            state.loading=false
        },
        fetchBranchStaffFailure:(state,action)=>{
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
        },
        updateStaffRequest:(state)=>{
            state.loading = true
        },
        updateStaffSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
        updateStaffFailure:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    createStaffRequest,
    createStaffSuccess,
    createStaffFailure,
    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure
} = staffSlice.actions

export default staffSlice.reducer