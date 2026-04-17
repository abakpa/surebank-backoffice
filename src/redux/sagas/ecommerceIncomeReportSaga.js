import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchEcommerceIncomeReportRequest,
    fetchEcommerceIncomeReportSuccess,
    fetchEcommerceIncomeReportFailure,
} from '../slices/ecommerceIncomeReportSlice';
import { url } from './url';

function* fetchEcommerceIncomeReportSaga(action) {
    const { date = null, branchId = null } = action.payload || {};
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const requestData = { date, branchId };
        const response = yield call(axios.post, `${url}/api/admindashboard/ecommerceincomereport`, requestData, config);
        yield put(fetchEcommerceIncomeReportSuccess(response.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        yield put(fetchEcommerceIncomeReportFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* ecommerceIncomeReportSaga() {
    yield takeLatest(fetchEcommerceIncomeReportRequest.type, fetchEcommerceIncomeReportSaga);
}

export default ecommerceIncomeReportSaga;
