import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  order: null,
  sbAccount: null,
  overdueOrders: [],
  loading: false,
  error: null,
  success: false,
  message: ''
};

const ecommerceOrderSlice = createSlice({
  name: 'ecommerceOrders',
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchOrderByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.sbAccount = null;
    },
    fetchOrderByIdSuccess: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    fetchOrderByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchOverdueOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOverdueOrdersSuccess: (state, action) => {
      state.overdueOrders = action.payload;
      state.loading = false;
    },
    fetchOverdueOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchSBAccountRequest: (state) => {
      state.error = null;
    },
    fetchSBAccountSuccess: (state, action) => {
      state.sbAccount = action.payload;
    },
    fetchSBAccountFailure: (state, action) => {
      state.error = action.payload;
      state.sbAccount = null;
    },
    updateOrderStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateOrderStatusSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload.order._id);
      if (index !== -1) {
        state.orders[index] = action.payload.order;
      }
      if (state.order && state.order._id === action.payload.order._id) {
        state.order = action.payload.order;
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    updateOrderStatusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    recordPaymentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    recordPaymentSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload.order._id);
      if (index !== -1) {
        state.orders[index] = action.payload.order;
      }
      if (state.order && state.order._id === action.payload.order._id) {
        state.order = action.payload.order;
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    recordPaymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    creditSBAccountRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    creditSBAccountSuccess: (state, action) => {
      if (action.payload.walletAccount) {
        state.sbAccount = action.payload.walletAccount;
      }
      if (action.payload.order) {
        state.order = action.payload.order;
        const index = state.orders.findIndex(o => o._id === action.payload.order._id);
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message || 'Wallet credited successfully';
    },
    creditSBAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    cancelOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    cancelOrderSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload.order._id);
      if (index !== -1) {
        state.orders[index] = action.payload.order;
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    cancelOrderFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    clearOrderState: (state) => {
      state.success = false;
      state.error = null;
      state.message = '';
    }
  }
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderByIdRequest,
  fetchOrderByIdSuccess,
  fetchOrderByIdFailure,
  fetchOverdueOrdersRequest,
  fetchOverdueOrdersSuccess,
  fetchOverdueOrdersFailure,
  fetchSBAccountRequest,
  fetchSBAccountSuccess,
  fetchSBAccountFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  recordPaymentRequest,
  recordPaymentSuccess,
  recordPaymentFailure,
  creditSBAccountRequest,
  creditSBAccountSuccess,
  creditSBAccountFailure,
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFailure,
  clearOrderState
} = ecommerceOrderSlice.actions;

export default ecommerceOrderSlice.reducer;
