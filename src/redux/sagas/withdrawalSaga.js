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
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/dsaccount/withdrawal`,{},config)
        yield put(fetchWithdrawalSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchWithdrawalFailure(error.response.data.message))
    }
}
function* withdrawalSaga(){
    yield takeLatest(fetchWithdrawalRequest.type, fetchWithdrawalSaga)
}

export default withdrawalSaga