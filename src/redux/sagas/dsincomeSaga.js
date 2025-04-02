import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDSIncomeRequest,
    fetchDSIncomeSuccess,
    fetchDSIncomeFailure,

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


function* branchSaga(){
    yield takeLatest(fetchDSIncomeRequest.type, fetchDSIncomeSaga)

}

export default branchSaga