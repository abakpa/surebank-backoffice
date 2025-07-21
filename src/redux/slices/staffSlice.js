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
       disableAllStaffRequest:(state)=>{
            state.loading = true
        },
       disableAllStaffSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
       disableAllStaffFailure:(state,action)=>{
            state.error = action.payload
        },
      activateAllStaffRequest:(state)=>{
            state.loading = true
        },
      activateAllStaffSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
      activateAllStaffFailure:(state,action)=>{
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
        },
        resetStaffPasswordRequest:(state)=>{
            state.loading = true
        },
       resetStaffPasswordSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
       resetStaffPasswordFailure:(state,action)=>{
            state.error = action.payload
        },
        updatePasswordRequest:(state)=>{
            state.loading = true
        },
       updatePasswordSuccess:(state,action)=>{
            state.staffs= action.payload;
            state.loading=false
        },
       updatePasswordFailure:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,
  disableAllStaffRequest,
  disableAllStaffSuccess,
  disableAllStaffFailure,
  activateAllStaffRequest,
  activateAllStaffSuccess,
  activateAllStaffFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    createStaffRequest,
    createStaffSuccess,
    createStaffFailure,
    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure,
    resetStaffPasswordRequest,
    resetStaffPasswordSuccess,
    resetStaffPasswordFailure,
    updatePasswordRequest,
   updatePasswordSuccess,
   updatePasswordFailure
} = staffSlice.actions

export default staffSlice.reducer