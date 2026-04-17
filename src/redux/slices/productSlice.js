import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
  message: ''
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchProductByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createProductSuccess: (state, action) => {
      state.products.unshift(action.payload.product);
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    createProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    updateProductRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload.product._id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload);
      state.loading = false;
      state.message = 'Product deleted successfully';
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
      state.message = '';
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  clearProductState
} = productSlice.actions;

export default productSlice.reducer;
