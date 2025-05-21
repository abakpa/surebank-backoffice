import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchSBIncomeRequest,
    fetchSBIncomeSuccess,
    fetchSBIncomeFailure,
    fetchBranchSBIncomeRequest,
    fetchBranchSBIncomeSuccess,
    fetchBranchSBIncomeFailure,

} from '../slices/sbIncomeSlice'
import { url } from './url'

 function* fetchSBIncomeSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/admindashboard/sbincomereport`,{},config)
        yield put(fetchSBIncomeSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchSBIncomeFailure(error.response.data.message))
    }
}
 function* fetchBranchSBIncomeSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchsbincomereport`,{},config)
        yield put(fetchBranchSBIncomeSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchSBIncomeFailure(error.response.data.message))
    }
}


function* branchSaga(){
    yield takeLatest(fetchSBIncomeRequest.type, fetchSBIncomeSaga)
    yield takeLatest(fetchBranchSBIncomeRequest.type, fetchBranchSBIncomeSaga)
  
}

export default branchSaga