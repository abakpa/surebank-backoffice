import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchSBIncomeRequest,
    fetchSBIncomeSuccess,
    fetchSBIncomeFailure,

} from '../slices/sbIncomeSlice'
import { url } from './url'

 function* fetchSBIncomeSaga(){
    try {
        const response = yield call(axios.post, `${url}/api/admindashboard/sbincomereport`)
        yield put(fetchSBIncomeSuccess(response.data))
    } catch (error) {
        yield put(fetchSBIncomeFailure(error.response.data.message))
    }
}


function* branchSaga(){
    yield takeLatest(fetchSBIncomeRequest.type, fetchSBIncomeSaga)
  
}

export default branchSaga