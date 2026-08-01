import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  productDemand: {},
  productDemandDetail: null,
  productDemandLoading: false,
  productDemandError: null,
  productSales: {},
  productSalesLoading: false,
  productSalesError: null,
  stockTransfers: [],
  stockTransferPagination: {
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  stockTransferLoading: false,
  stockTransferError: null,
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
    fetchProductSalesRequest: (state) => {
      state.productSalesLoading = true;
      state.productSalesError = null;
    },
    fetchProductSalesSuccess: (state, action) => {
      state.productSales = (action.payload || []).reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {});
      state.productSalesLoading = false;
    },
    fetchProductSalesFailure: (state, action) => {
      state.productSalesError = action.payload;
      state.productSalesLoading = false;
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
    fetchStockTransfersRequest: (state) => {
      state.stockTransferLoading = true;
      state.stockTransferError = null;
    },
    fetchStockTransfersSuccess: (state, action) => {
      const payload = action.payload || {};
      state.stockTransfers = Array.isArray(payload) ? payload : (payload.data || []);
      state.stockTransferPagination = Array.isArray(payload)
        ? state.stockTransferPagination
        : {
            page: payload.pagination?.page || 1,
            limit: payload.pagination?.limit || 25,
            total: payload.pagination?.total || 0,
            totalPages: payload.pagination?.totalPages || 1,
            hasNextPage: Boolean(payload.pagination?.hasNextPage),
            hasPrevPage: Boolean(payload.pagination?.hasPrevPage),
          };
      state.stockTransferLoading = false;
    },
    fetchStockTransfersFailure: (state, action) => {
      state.stockTransferError = action.payload;
      state.stockTransferLoading = false;
    },
    createStockTransferRequest: (state) => {
      state.stockTransferLoading = true;
      state.stockTransferError = null;
      state.success = false;
    },
    createStockTransferSuccess: (state, action) => {
      state.stockTransfers.unshift(action.payload.data);
      state.stockTransferLoading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    createStockTransferFailure: (state, action) => {
      state.stockTransferError = action.payload;
      state.stockTransferLoading = false;
      state.success = false;
    },
    acceptStockTransferRequest: (state) => {
      state.stockTransferLoading = true;
      state.stockTransferError = null;
    },
    acceptStockTransferSuccess: (state, action) => {
      const index = state.stockTransfers.findIndex((item) => item._id === action.payload.data._id);
      if (index !== -1) {
        state.stockTransfers[index] = action.payload.data;
      }
      state.stockTransferLoading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    acceptStockTransferFailure: (state, action) => {
      state.stockTransferError = action.payload;
      state.stockTransferLoading = false;
    },
    rejectStockTransferRequest: (state) => {
      state.stockTransferLoading = true;
      state.stockTransferError = null;
    },
    rejectStockTransferSuccess: (state, action) => {
      const index = state.stockTransfers.findIndex((item) => item._id === action.payload.data._id);
      if (index !== -1) {
        state.stockTransfers[index] = action.payload.data;
      }
      state.stockTransferLoading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    rejectStockTransferFailure: (state, action) => {
      state.stockTransferError = action.payload;
      state.stockTransferLoading = false;
    },
    cancelStockTransferRequest: (state) => {
      state.stockTransferLoading = true;
      state.stockTransferError = null;
    },
    cancelStockTransferSuccess: (state, action) => {
      const index = state.stockTransfers.findIndex((item) => item._id === action.payload.data._id);
      if (index !== -1) {
        state.stockTransfers[index] = action.payload.data;
      }
      state.stockTransferLoading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    cancelStockTransferFailure: (state, action) => {
      state.stockTransferError = action.payload;
      state.stockTransferLoading = false;
    },
    clearProductState: (state) => {
      state.product = null;
      state.success = false;
      state.error = null;
      state.stockTransferError = null;
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
  fetchProductSalesRequest,
  fetchProductSalesSuccess,
  fetchProductSalesFailure,
  fetchProductDemandDetailRequest,
  fetchProductDemandDetailSuccess,
  fetchProductDemandDetailFailure,
  clearProductDemandDetail,
  fetchStockTransfersRequest,
  fetchStockTransfersSuccess,
  fetchStockTransfersFailure,
  createStockTransferRequest,
  createStockTransferSuccess,
  createStockTransferFailure,
  acceptStockTransferRequest,
  acceptStockTransferSuccess,
  acceptStockTransferFailure,
  rejectStockTransferRequest,
  rejectStockTransferSuccess,
  rejectStockTransferFailure,
  cancelStockTransferRequest,
  cancelStockTransferSuccess,
  cancelStockTransferFailure,
  clearProductState
} = productSlice.actions;

export default productSlice.reducer;
