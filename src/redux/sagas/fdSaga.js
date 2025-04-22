import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchFDRequest,
    fetchFDSuccess,
    fetchFDFailure,
    fetchBranchFDRequest,
    fetchBranchFDSuccess,
    fetchBranchFDFailure,

} from '../slices/fdSlice'
import { url } from './url'

function* fetchFDSaga(){
    try {
        const response = yield call(axios.post, `${url}/api/admindashboard/fdreport`)
        yield put(fetchFDSuccess(response.data))
    } catch (error) {
        yield put(fetchFDFailure(error.response.data.message))
    }
}
function* fetchBranchFDSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchfdreport`,{},config)
        yield put(fetchBranchFDSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchFDFailure(error.response.data.message))
    }
}


function* FDreportSaga(){
    yield takeLatest(fetchFDRequest.type, fetchFDSaga)
    yield takeLatest(fetchBranchFDRequest.type, fetchBranchFDSaga)
  
}

export default FDreportSaga