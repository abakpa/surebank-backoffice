import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderFailure,
    fetchBranchOrderRequest,
    fetchBranchOrderSuccess,
    fetchBranchOrderFailure,
    fetchRepOrderRequest,
    fetchRepOrderSuccess,
    fetchRepOrderFailure,

} from '../slices/orderSlice'
import { url } from './url'

function* fetchOrderSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/admindashboard/order`,{},config)
        console.log("saga order",response)
        yield put(fetchOrderSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchOrderFailure(error.response.data.message))
    }
}
function* fetchBranchOrderSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchorder`,{},config)
        yield put(fetchBranchOrderSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchOrderFailure(error.response.data.message))
    }
}
function* fetchRepOrderSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/repdashboard/reporder`,{},config)
        yield put(fetchRepOrderSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepOrderFailure(error.response.data.message))
    }
}


function* transactionSaga(){
    yield takeLatest(fetchOrderRequest.type, fetchOrderSaga)
    yield takeLatest(fetchBranchOrderRequest.type, fetchBranchOrderSaga)
    yield takeLatest(fetchRepOrderRequest.type, fetchRepOrderSaga)
  
}

export default transactionSaga