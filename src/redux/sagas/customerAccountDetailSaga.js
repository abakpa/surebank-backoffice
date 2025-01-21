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
        const response = yield call(axios.get, `${url}/api/account`)
        yield put(fetchAllCustomerAccountDetailSuccess(response.data))
    } catch (error) {
        yield put(fetchAllCustomerAccountDetailFailure(error.response.data.message))
    }
}
 function* fetchCustomerAccountDetailSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/account`)
        yield put(fetchCustomerAccountDetailSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerAccountDetailFailure(error.response.data.message))
    }
}
function* createCustomerAccountDetailSaga(action){

    const {accountNumber,navigate} = action.payload
    
    try {
        // const token = localStorage.getItem('authToken');
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        const response = yield call(axios.post,`${url}/api/account`, {accountNumber});
        yield put(createCustomerAccountDetailSuccess(response.data))
        navigate('/customeraccountdashboard')
    } catch (error) {
        yield put(createCustomerAccountDetailFailure(error.message))
    }
}

function* customerAccountDetailSaga(){
    yield takeLatest(fetchAllCustomerAccountDetailRequest.type, fetchAllCustomerAccountDetailSaga)
    yield takeLatest(fetchCustomerAccountDetailRequest.type, fetchCustomerAccountDetailSaga)
    yield takeLatest(createCustomerAccountDetailRequest.type, createCustomerAccountDetailSaga)
}

export default customerAccountDetailSaga