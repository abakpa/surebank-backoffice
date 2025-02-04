import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure
} from '../slices/withdrawalSlice'
import { url } from './url'

 function* fetchWithdrawalSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount/withdrawal`)
        yield put(fetchWithdrawalSuccess(response.data))
    } catch (error) {
        yield put(fetchWithdrawalFailure(error.response.data.message))
    }
}
function* createWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount/withdrawal`, details,config);
        console.log("errrror",response.data)
        yield put(createWithdrawalSuccess(response.data))
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createWithdrawalFailure(errorMessage))
    }
}
function* createMainWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log("33",details)
        const response = yield call(axios.post,`${url}/api/dsaccount/mainwithdrawal`, details,config);
        yield put(createMainWithdrawalSuccess(response.data))
        console.log("errrror",response.data)
        // navigate('/deposit')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.message
        yield put(createMainWithdrawalFailure(errorMessage))
    }
}

function* withdrawalSaga(){
    yield takeLatest(fetchWithdrawalRequest.type, fetchWithdrawalSaga)
    yield takeLatest(createWithdrawalRequest.type, createWithdrawalSaga)
    yield takeLatest(createMainWithdrawalRequest.type, createMainWithdrawalSaga)
}

export default withdrawalSaga