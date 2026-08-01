import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
  success: false,
  message: ''
};

const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchCategoryByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoryByIdSuccess: (state, action) => {
      state.category = action.payload;
      state.loading = false;
    },
    fetchCategoryByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createCategoryRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createCategorySuccess: (state, action) => {
      state.categories.unshift(action.payload.category);
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    createCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    updateCategoryRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateCategorySuccess: (state, action) => {
      const index = state.categories.findIndex(c => c._id === action.payload.category._id);
      if (index !== -1) {
        state.categories[index] = action.payload.category;
      }
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    },
    updateCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    deleteCategoryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(c => c._id !== action.payload);
      state.loading = false;
      state.message = 'Category deleted successfully';
    },
    deleteCategoryFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    toggleCategoryStatusRequest: (state) => {
      state.error = null;
    },
    toggleCategoryStatusSuccess: (state, action) => {
      const index = state.categories.findIndex(c => c._id === action.payload.category._id);
      if (index !== -1) {
        state.categories[index] = action.payload.category;
      }
      state.message = action.payload.message;
    },
    toggleCategoryStatusFailure: (state, action) => {
      state.error = action.payload;
    },
    clearCategoryState: (state) => {
      state.success = false;
      state.error = null;
      state.message = '';
    }
  }
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchCategoryByIdRequest,
  fetchCategoryByIdSuccess,
  fetchCategoryByIdFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  toggleCategoryStatusRequest,
  toggleCategoryStatusSuccess,
  toggleCategoryStatusFailure,
  clearCategoryState
} = productCategorySlice.actions;

export default productCategorySlice.reducer;
