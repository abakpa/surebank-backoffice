import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchFDIncomeRequest,
    fetchFDIncomeSuccess,
    fetchFDIncomeFailure,
    fetchBranchFDIncomeRequest,
    fetchBranchFDIncomeSuccess,
    fetchBranchFDIncomeFailure,
    // fetchFDIncomeByIdRequest,
    // fetchFDIncomeByIdSuccess,
    // fetchFDIncomeByIdFailure,
    // createFDIncomeRequest,
    // createFDIncomeSuccess,
    // createFDIncomeFailure

} from '../slices/FDincomeSllice'
import { url } from './url'

 function* fetchFDIncomeSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/fdaccount/fdstatement`,{},config)
        console.log("ds income",response)
        yield put(fetchFDIncomeSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDIncomeFailure(error.response.data.message))
    }
}
 function* fetchBranchFDIncomeSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchfdincomereport`,{},config)
        
        yield put(fetchBranchFDIncomeSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchFDIncomeFailure(error.response.data.message))
    }
}


function* branchSaga(){
    yield takeLatest(fetchFDIncomeRequest.type, fetchFDIncomeSaga)
    yield takeLatest(fetchBranchFDIncomeRequest.type, fetchBranchFDIncomeSaga)

}

export default branchSaga