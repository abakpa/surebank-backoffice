import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
  fetchProductDemandDetailFailure
} from '../slices/productSlice';
import { url } from './url';

function* fetchProductsSaga() {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/products/admin/all`, config);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchProductsFailure(error.response?.data?.message || error.message));
  }
}

function* fetchProductByIdSaga(action) {
  const { productId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/products/${productId}`, config);
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchProductByIdFailure(error.response?.data?.message || error.message));
  }
}

function* createProductSaga(action) {
  const { formData, navigate } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = yield call(axios.post, `${url}/api/products`, formData, config);
    yield put(createProductSuccess(response.data));
    if (navigate) {
      navigate('/products');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(createProductFailure(error.response?.data?.message || error.message));
  }
}

function* updateProductSaga(action) {
  const { productId, formData, navigate } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = yield call(axios.put, `${url}/api/products/${productId}`, formData, config);
    yield put(updateProductSuccess(response.data));
    if (navigate) {
      navigate('/products');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(updateProductFailure(error.response?.data?.message || error.message));
  }
}

function* updateProductStockSaga(action) {
  const { productId, quantity, variationId, stockItems } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updates = Array.isArray(stockItems) && stockItems.length > 0
      ? stockItems
      : [{ quantity, variationId: variationId || '' }];
    let response;

    for (const item of updates) {
      response = yield call(
        axios.put,
        `${url}/api/products/${productId}/stock`,
        { quantity: item.quantity, operation: 'set', variationId: item.variationId || '' },
        config
      );
    }

    yield put(updateProductStockSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(updateProductStockFailure(error.response?.data?.message || error.message));
  }
}

function* deleteProductSaga(action) {
  const { productId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    yield call(axios.delete, `${url}/api/products/${productId}`, config);
    yield put(deleteProductSuccess(productId));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(deleteProductFailure(error.response?.data?.message || error.message));
  }
}

function* fetchProductDemandSaga() {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/product-demand`, config);
    yield put(fetchProductDemandSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchProductDemandFailure(error.response?.data?.message || error.message));
  }
}

function* fetchProductDemandDetailSaga(action) {
  const { productId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/product-demand/${productId}`, config);
    yield put(fetchProductDemandDetailSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchProductDemandDetailFailure(error.response?.data?.message || error.message));
  }
}

function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(fetchProductByIdRequest.type, fetchProductByIdSaga);
  yield takeLatest(createProductRequest.type, createProductSaga);
  yield takeLatest(updateProductRequest.type, updateProductSaga);
  yield takeLatest(updateProductStockRequest.type, updateProductStockSaga);
  yield takeLatest(deleteProductRequest.type, deleteProductSaga);
  yield takeLatest(fetchProductDemandRequest.type, fetchProductDemandSaga);
  yield takeLatest(fetchProductDemandDetailRequest.type, fetchProductDemandDetailSaga);
}

export default productSaga;
