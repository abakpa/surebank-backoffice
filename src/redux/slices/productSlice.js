import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  productDemand: {},
  productDemandDetail: null,
  productDemandLoading: false,
  productDemandError: null,
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
    updateProductStockRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateProductStockSuccess: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload.product._id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
      state.product = action.payload.product;
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    updateProductStockFailure: (state, action) => {
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
    fetchProductDemandRequest: (state) => {
      state.productDemandLoading = true;
      state.productDemandError = null;
    },
    fetchProductDemandSuccess: (state, action) => {
      state.productDemand = (action.payload || []).reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {});
      state.productDemandLoading = false;
    },
    fetchProductDemandFailure: (state, action) => {
      state.productDemandError = action.payload;
      state.productDemandLoading = false;
    },
    fetchProductDemandDetailRequest: (state) => {
      state.productDemandLoading = true;
      state.productDemandError = null;
      state.productDemandDetail = null;
    },
    fetchProductDemandDetailSuccess: (state, action) => {
      state.productDemandDetail = action.payload;
      state.productDemandLoading = false;
    },
    fetchProductDemandDetailFailure: (state, action) => {
      state.productDemandError = action.payload;
      state.productDemandLoading = false;
    },
    clearProductDemandDetail: (state) => {
      state.productDemandDetail = null;
      state.productDemandError = null;
    },
    clearProductState: (state) => {
      state.product = null;
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
  updateProductStockRequest,
  updateProductStockSuccess,
  updateProductStockFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  fetchProductDemandRequest,
  fetchProductDemandSuccess,
  fetchProductDemandFailure,
  fetchProductDemandDetailRequest,
  fetchProductDemandDetailSuccess,
  fetchProductDemandDetailFailure,
  clearProductDemandDetail,
  clearProductState
} = productSlice.actions;

export default productSlice.reducer;
