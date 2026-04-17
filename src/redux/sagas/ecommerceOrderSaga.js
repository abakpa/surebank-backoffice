import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
  cancelOrderFailure
} from '../slices/ecommerceOrderSlice';
import { url } from './url';

function* fetchOrdersSaga(action) {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const params = action.payload || {};
    const queryString = new URLSearchParams(params).toString();
    const response = yield call(axios.get, `${url}/api/ecommerce/orders?${queryString}`, config);
    yield put(fetchOrdersSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchOrdersFailure(error.response?.data?.message || error.message));
  }
}

function* fetchOrderByIdSaga(action) {
  const { orderId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/${orderId}`, config);
    yield put(fetchOrderByIdSuccess(response.data));

    // If it's an installment order, also fetch the wallet account
    if (response.data.paymentType === 'installment' && response.data.SBAccountNumber) {
      yield put(fetchSBAccountRequest({ orderId }));
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchOrderByIdFailure(error.response?.data?.message || error.message));
  }
}

function* fetchSBAccountSaga(action) {
  const { orderId } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/${orderId}/wallet-account`, config);
    yield put(fetchSBAccountSuccess(response.data));
  } catch (error) {
    yield put(fetchSBAccountFailure(error.response?.data?.message || error.message));
  }
}

function* fetchOverdueOrdersSaga() {
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.get, `${url}/api/ecommerce/orders/overdue`, config);
    yield put(fetchOverdueOrdersSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(fetchOverdueOrdersFailure(error.response?.data?.message || error.message));
  }
}

function* updateOrderStatusSaga(action) {
  const { orderId, status } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.put, `${url}/api/ecommerce/orders/${orderId}/status`, { status }, config);
    yield put(updateOrderStatusSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(updateOrderStatusFailure(error.response?.data?.message || error.message));
  }
}

function* recordPaymentSaga(action) {
  const { orderId, amount, transactionRef, paymentType } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const endpoint = paymentType === 'installment'
      ? `${url}/api/ecommerce/orders/${orderId}/installment-payment`
      : `${url}/api/ecommerce/orders/${orderId}/payment`;

    const response = yield call(axios.post, endpoint, { amount, transactionRef }, config);
    yield put(recordPaymentSuccess(response.data));

    // Refresh SB Account after payment
    if (paymentType === 'installment') {
      yield put(fetchSBAccountRequest({ orderId }));
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(recordPaymentFailure(error.response?.data?.message || error.message));
  }
}

function* creditSBAccountSaga(action) {
  const { orderId, amount } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.post, `${url}/api/ecommerce/orders/${orderId}/credit-sb-account`, { amount }, config);
    yield put(creditSBAccountSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(creditSBAccountFailure(error.response?.data?.message || error.message));
  }
}

function* cancelOrderSaga(action) {
  const { orderId, reason } = action.payload;
  try {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = yield call(axios.post, `${url}/api/ecommerce/orders/${orderId}/cancel`, { reason }, config);
    yield put(cancelOrderSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    yield put(cancelOrderFailure(error.response?.data?.message || error.message));
  }
}

function* ecommerceOrderSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeLatest(fetchOrderByIdRequest.type, fetchOrderByIdSaga);
  yield takeLatest(fetchSBAccountRequest.type, fetchSBAccountSaga);
  yield takeLatest(fetchOverdueOrdersRequest.type, fetchOverdueOrdersSaga);
  yield takeLatest(updateOrderStatusRequest.type, updateOrderStatusSaga);
  yield takeLatest(recordPaymentRequest.type, recordPaymentSaga);
  yield takeLatest(creditSBAccountRequest.type, creditSBAccountSaga);
  yield takeLatest(cancelOrderRequest.type, cancelOrderSaga);
}

export default ecommerceOrderSaga;
