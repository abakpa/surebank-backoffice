import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchCustomerAccountDetailRequest,
    fetchCustomerAccountDetailSuccess,
    fetchCustomerAccountDetailFailure,
    fetchAllCustomerAccountDetailRequest, 
    fetchAllCustomerAccountDetailSuccess,
    fetchAllCustomerAccountDetailFailure,
    createCustomerAccountDetailRequest,
    createCustomerAccountDetailSuccess,
    createCustomerAccountDetailFailure
} from '../slices/customerAccountDetailSlice'
import { url } from './url'

 function* fetchAllCustomerAccountDetailSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/account`,config)
        yield put(fetchAllCustomerAccountDetailSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchAllCustomerAccountDetailFailure(error.response.data.message))
    }
}
 function* fetchCustomerAccountDetailSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/account`,config)
        yield put(fetchCustomerAccountDetailSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchCustomerAccountDetailFailure(error.response.data.message))
    }
}
function* createCustomerAccountDetailSaga(action){

    const {accountNumber,navigate} = action.payload
    
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post,`${url}/api/account`, {accountNumber},config);
        yield put(createCustomerAccountDetailSuccess(response.data))
        navigate('/customeraccountdashboard')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(createCustomerAccountDetailFailure(error.message))
    }
}

function* customerAccountDetailSaga(){
    yield takeLatest(fetchAllCustomerAccountDetailRequest.type, fetchAllCustomerAccountDetailSaga)
    yield takeLatest(fetchCustomerAccountDetailRequest.type, fetchCustomerAccountDetailSaga)
    yield takeLatest(createCustomerAccountDetailRequest.type, createCustomerAccountDetailSaga)
}

export default customerAccountDetailSaga