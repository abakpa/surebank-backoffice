import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchExpenditureRequest,
    fetchExpenditureSuccess,
    fetchExpenditureFailure,
    fetchBranchExpenditureRequest,
    fetchBranchExpenditureSuccess,
    fetchBranchExpenditureFailure,

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
function* fetchBranchExpenditureSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchexpenditurereport`,{},config)
        yield put(fetchBranchExpenditureSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchExpenditureFailure(error.response.data.message))
    }
}


function* expenditurereportSaga(){
    yield takeLatest(fetchExpenditureRequest.type, fetchExpenditureSaga)
    yield takeLatest(fetchBranchExpenditureRequest.type, fetchBranchExpenditureSaga)
  
}

export default expenditurereportSaga