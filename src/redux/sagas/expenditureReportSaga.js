import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchExpenditureRequest,
    fetchExpenditureSuccess,
    fetchExpenditureFailure,

} from '../slices/expenditureReportSlice'
import { url } from './url'

function* fetchExpenditureSaga(){
    try {
        const response = yield call(axios.post, `${url}/api/admindashboard/expenditurereport`)
        yield put(fetchExpenditureSuccess(response.data))
    } catch (error) {
        yield put(fetchExpenditureFailure(error.response.data.message))
    }
}


function* customerSaga(){
    yield takeLatest(fetchExpenditureRequest.type, fetchExpenditureSaga)
  
}

export default customerSaga