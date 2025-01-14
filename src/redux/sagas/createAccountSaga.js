import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchCustomerAccountRequest,fetchCustomerAccountSuccess,fetchCustomerAccountFailure,createCustomerAccountRequest,createCustomerAccountSuccess,createCustomerAccountFailure} from '../slices/createAccountSlice'
import { url } from './url'

 function* fetchCustomerAccountSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount`)
        yield put(fetchCustomerAccountSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerAccountFailure(error.response.data.message))
    }
}
function* createCustomerAccountSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount`, details,config);
        yield put(createCustomerAccountSuccess(response.data))
        navigate('/deposit')
    } catch (error) {
        yield put(createCustomerAccountFailure(error.message))
    }
}

function* customerAccountSaga(){
    yield takeLatest(fetchCustomerAccountRequest.type, fetchCustomerAccountSaga)
    yield takeLatest(createCustomerAccountRequest.type, createCustomerAccountSaga)
}

export default customerAccountSaga