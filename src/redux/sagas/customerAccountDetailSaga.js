import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchCustomerAccountDetailRequest,fetchCustomerAccountDetailSuccess,fetchCustomerAccountDetailFailure,createCustomerAccountDetailRequest,createCustomerAccountDetailSuccess,createCustomerAccountDetailFailure} from '../slices/createAccountSlice'
import { url } from './url'

 function* fetchCustomerAccountDetailSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount`)
        yield put(fetchCustomerAccountDetailSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerAccountDetailFailure(error.response.data.message))
    }
}
function* createCustomerAccountDetailSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount`, details,config);
        yield put(createCustomerAccountDetailSuccess(response.data))
        navigate('/deposit')
    } catch (error) {
        yield put(createCustomerAccountDetailFailure(error.message))
    }
}

function* customerAccountDetailSaga(){
    yield takeLatest(fetchCustomerAccountDetailRequest.type, fetchCustomerAccountDetailSaga)
    yield takeLatest(createCustomerAccountDetailRequest.type, createCustomerAccountDetailSaga)
}

export default customerAccountDetailSaga