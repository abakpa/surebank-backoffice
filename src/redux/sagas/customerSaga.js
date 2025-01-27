import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchCustomerRequest,
    fetchCustomerSuccess,
    fetchCustomerFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    createCustomerRequest,
    createCustomerSuccess,
    createCustomerFailure
} from '../slices/customerSlice'
import { url } from './url'

 function* fetchCustomerSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/customer`)
        yield put(fetchCustomerSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerFailure(error.response.data.message))
    }
}
 function* fetchCustomerByIdSaga(action){
const {customerId} = action.payload
    try {

        const response = yield call(axios.get, `${url}/api/customer/${customerId}`)
        localStorage.setItem('customerName', response.data.name);
        yield put(fetchCustomerByIdSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerByIdFailure(error.response.data.message))
    }
}
function* createCustomerSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/customer`, details,config);
        yield put(createCustomerSuccess(response.data))
        navigate('/customers')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.error
        yield put(createCustomerFailure(errorMessage))
    }
}

function* customerSaga(){
    yield takeLatest(fetchCustomerRequest.type, fetchCustomerSaga)
    yield takeLatest(fetchCustomerByIdRequest.type, fetchCustomerByIdSaga)
    yield takeLatest(createCustomerRequest.type, createCustomerSaga)
}

export default customerSaga