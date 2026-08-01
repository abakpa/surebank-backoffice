import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
  toggleCategoryStatusFailure
} from '../slices/productCategorySlice';
import { url } from './url';

function* fetchCategoriesSaga() {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/categories/admin/all`, config);
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchCategoriesFailure(error.response?.data?.message || error.message));
  }
}

function* fetchCategoryByIdSaga(action) {
  const { categoryId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/categories/${categoryId}`, config);
    yield put(fetchCategoryByIdSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchCategoryByIdFailure(error.response?.data?.message || error.message));
  }
}

function* createCategorySaga(action) {
  const { formData, navigate } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = yield call(axios.post, `${url}/api/categories`, formData, config);
    yield put(createCategorySuccess(response.data));
    if (navigate) {
      navigate('/categories');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(createCategoryFailure(error.response?.data?.message || error.message));
  }
}

function* updateCategorySaga(action) {
  const { categoryId, formData, navigate } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = yield call(axios.put, `${url}/api/categories/${categoryId}`, formData, config);
    yield put(updateCategorySuccess(response.data));
    if (navigate) {
      navigate('/categories');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(updateCategoryFailure(error.response?.data?.message || error.message));
  }
}

function* deleteCategorySaga(action) {
  const { categoryId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    yield call(axios.delete, `${url}/api/categories/${categoryId}`, config);
    yield put(deleteCategorySuccess(categoryId));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(deleteCategoryFailure(error.response?.data?.message || error.message));
  }
}

function* toggleCategoryStatusSaga(action) {
  const { categoryId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.patch, `${url}/api/categories/${categoryId}/toggle-status`, {}, config);
    yield put(toggleCategoryStatusSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(toggleCategoryStatusFailure(error.response?.data?.message || error.message));
  }
}

function* productCategorySaga() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga);
  yield takeLatest(fetchCategoryByIdRequest.type, fetchCategoryByIdSaga);
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
  yield takeLatest(toggleCategoryStatusRequest.type, toggleCategoryStatusSaga);
}

export default productCategorySaga;
