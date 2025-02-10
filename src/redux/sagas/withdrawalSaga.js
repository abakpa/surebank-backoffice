import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
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
function* withdrawalSaga(){
    yield takeLatest(fetchWithdrawalRequest.type, fetchWithdrawalSaga)
}

export default withdrawalSaga