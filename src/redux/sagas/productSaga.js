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
  fetchProductSalesRequest,
  fetchProductSalesSuccess,
  fetchProductSalesFailure,
  fetchProductDemandDetailRequest,
  fetchProductDemandDetailSuccess,
  fetchProductDemandDetailFailure,
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
  cancelStockTransferFailure
} from '../slices/productSlice';
import { url } from './url';

const getAuthConfig = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const handleUnauthorized = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
};

function* fetchProductsSaga() {
  try {
    const config = getAuthConfig();
    const response = yield call(axios.get, `${url}/api/products/admin/all`, config);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    handleUnauthorized(error);
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

function* fetchProductSalesSaga() {
  try {
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/product-sales`, getAuthConfig());
    yield put(fetchProductSalesSuccess(response.data));
  } catch (error) {
    handleUnauthorized(error);
    yield put(fetchProductSalesFailure(error.response?.data?.message || error.message));
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

function* fetchStockTransfersSaga(action) {
  try {
    const filters = action?.payload || {};
    const queryString = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value);
      }
    });
    const endpoint = queryString.toString()
      ? `${url}/api/stock-transfers?${queryString.toString()}`
      : `${url}/api/stock-transfers`;
    const response = yield call(axios.get, endpoint, getAuthConfig());
    yield put(fetchStockTransfersSuccess(response.data));
  } catch (error) {
    handleUnauthorized(error);
    yield put(fetchStockTransfersFailure(error.response?.data?.message || error.message));
  }
}

function* createStockTransferSaga(action) {
  try {
    const response = yield call(axios.post, `${url}/api/stock-transfers`, action.payload, getAuthConfig());
    yield put(createStockTransferSuccess(response.data));
    yield put(fetchProductsRequest());
    yield put(fetchStockTransfersRequest());
  } catch (error) {
    handleUnauthorized(error);
    yield put(createStockTransferFailure(error.response?.data?.message || error.message));
  }
}

function* acceptStockTransferSaga(action) {
  try {
    const { transferId, responseNote } = action.payload;
    const response = yield call(
      axios.put,
      `${url}/api/stock-transfers/${transferId}/accept`,
      { responseNote },
      getAuthConfig()
    );
    yield put(acceptStockTransferSuccess(response.data));
    yield put(fetchProductsRequest());
    yield put(fetchStockTransfersRequest());
  } catch (error) {
    handleUnauthorized(error);
    yield put(acceptStockTransferFailure(error.response?.data?.message || error.message));
  }
}

function* rejectStockTransferSaga(action) {
  try {
    const { transferId, responseNote } = action.payload;
    const response = yield call(
      axios.put,
      `${url}/api/stock-transfers/${transferId}/reject`,
      { responseNote },
      getAuthConfig()
    );
    yield put(rejectStockTransferSuccess(response.data));
    yield put(fetchProductsRequest());
    yield put(fetchStockTransfersRequest());
  } catch (error) {
    handleUnauthorized(error);
    yield put(rejectStockTransferFailure(error.response?.data?.message || error.message));
  }
}

function* cancelStockTransferSaga(action) {
  try {
    const { transferId } = action.payload;
    const response = yield call(axios.put, `${url}/api/stock-transfers/${transferId}/cancel`, {}, getAuthConfig());
    yield put(cancelStockTransferSuccess(response.data));
    yield put(fetchProductsRequest());
    yield put(fetchStockTransfersRequest());
  } catch (error) {
    handleUnauthorized(error);
    yield put(cancelStockTransferFailure(error.response?.data?.message || error.message));
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
  yield takeLatest(fetchProductSalesRequest.type, fetchProductSalesSaga);
  yield takeLatest(fetchProductDemandDetailRequest.type, fetchProductDemandDetailSaga);
  yield takeLatest(fetchStockTransfersRequest.type, fetchStockTransfersSaga);
  yield takeLatest(createStockTransferRequest.type, createStockTransferSaga);
  yield takeLatest(acceptStockTransferRequest.type, acceptStockTransferSaga);
  yield takeLatest(rejectStockTransferRequest.type, rejectStockTransferSaga);
  yield takeLatest(cancelStockTransferRequest.type, cancelStockTransferSaga);
}

export default productSaga;
