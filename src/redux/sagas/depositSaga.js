import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchDepositRequest,fetchDepositSuccess,fetchDepositFailure,createDepositRequest,createDepositSuccess,createDepositFailure} from '../slices/depositSlice'
import { url } from './url'

 function* fetchDepositSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount/deposit`)
        yield put(fetchDepositSuccess(response.data))
    } catch (error) {
        yield put(fetchDepositFailure(error.response.data.message))
    }
}
function* createDepositSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount/deposit`, details,config);
        yield put(createDepositSuccess(response.data))
        // navigate('/deposit')
    } catch (error) {
        yield put(createDepositFailure(error.message))
    }
}

function* depositSaga(){
    yield takeLatest(fetchDepositRequest.type, fetchDepositSaga)
    yield takeLatest(createDepositRequest.type, createDepositSaga)
}

export default depositSaga