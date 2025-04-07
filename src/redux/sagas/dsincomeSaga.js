import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDSIncomeRequest,
    fetchDSIncomeSuccess,
    fetchDSIncomeFailure,
    fetchBranchDSIncomeRequest,
    fetchBranchDSIncomeSuccess,
    fetchBranchDSIncomeFailure,

} from '../slices/dsincomeSlice'
import { url } from './url'

 function* fetchDSIncomeSaga(){
    try {
        const response = yield call(axios.post, `${url}/api/admindashboard/dsincomereport`)
        console.log("ds income",response)
        yield put(fetchDSIncomeSuccess(response.data))
    } catch (error) {
        yield put(fetchDSIncomeFailure(error.response.data.message))
    }
}
 function* fetchBranchDSIncomeSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchdsincomereport`,{},config)
        console.log("ds income",response)
        yield put(fetchBranchDSIncomeSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchDSIncomeFailure(error.response.data.message))
    }
}


function* branchSaga(){
    yield takeLatest(fetchDSIncomeRequest.type, fetchDSIncomeSaga)
    yield takeLatest(fetchBranchDSIncomeRequest.type, fetchBranchDSIncomeSaga)

}

export default branchSaga