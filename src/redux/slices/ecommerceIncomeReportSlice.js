import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    ecommerceIncomeReport: [],
    loading: false,
    error: null,
};

const ecommerceIncomeReportSlice = createSlice({
    name: 'ecommerceIncomeReport',
    initialState,
    reducers: {
        fetchEcommerceIncomeReportRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEcommerceIncomeReportSuccess: (state, action) => {
            state.ecommerceIncomeReport = action.payload;
            state.loading = false;
        },
        fetchEcommerceIncomeReportFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const {
    fetchEcommerceIncomeReportRequest,
    fetchEcommerceIncomeReportSuccess,
    fetchEcommerceIncomeReportFailure,
} = ecommerceIncomeReportSlice.actions;

export default ecommerceIncomeReportSlice.reducer;
