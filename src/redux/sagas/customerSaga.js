import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchCustomerRequest,fetchCustomerSuccess,fetchCustomerFailure,createCustomerRequest,createCustomerSuccess,createCustomerFailure} from '../slices/customerSlice'
import { url } from './url'

 function* fetchCustomerSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/customer`)
        yield put(fetchCustomerSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerFailure(error.response.data.message))
    }
}
function* createCustomerSaga(action){
    const {details,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/customer`, details);
        yield put(createCustomerSuccess(response.data))
        navigate('/customers')
    } catch (error) {
        yield put(createCustomerFailure(error.message))
    }
}

function* customerSaga(){
    yield takeLatest(fetchCustomerRequest.type, fetchCustomerSaga)
    yield takeLatest(createCustomerRequest.type, createCustomerSaga)
}

export default customerSaga