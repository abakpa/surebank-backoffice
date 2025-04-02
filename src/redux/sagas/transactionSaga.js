import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchTransactionRequest,
    fetchTransactionSuccess,
    fetchTransactionFailure,

} from '../slices/transactionSlice'
import { url } from './url'

function* fetchTransactionSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/admindashboard/transaction`,{},config)
        console.log("saga transaction",response)
        yield put(fetchTransactionSuccess(response.data))
    } catch (error) {
        yield put(fetchTransactionFailure(error.response.data.message))
    }
}


function* transactionSaga(){
    yield takeLatest(fetchTransactionRequest.type, fetchTransactionSaga)
  
}

export default transactionSaga