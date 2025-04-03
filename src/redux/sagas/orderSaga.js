import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderFailure,

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
        yield put(fetchOrderFailure(error.response.data.message))
    }
}


function* transactionSaga(){
    yield takeLatest(fetchOrderRequest.type, fetchOrderSaga)
  
}

export default transactionSaga