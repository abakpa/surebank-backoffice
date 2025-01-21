import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchBranchRequest,
    fetchBranchSuccess,
    fetchBranchFailure,
    fetchBranchByIdRequest,
    fetchBranchByIdSuccess,
    fetchBranchByIdFailure,
    createBranchRequest,
    createBranchSuccess,
    createBranchFailure
} from '../slices/branchSlice'
import { url } from './url'

 function* fetchBranchSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/branch`)
        yield put(fetchBranchSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchFailure(error.response.data.message))
    }
}
 function* fetchBranchByIdSaga(action){
    const {branchId} = action.payload
    try {

        const response = yield call(axios.get, `${url}/api/branch/${branchId}`)
        yield put(fetchBranchByIdSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchByIdFailure(error.response.data.message))
    }
}
function* createBranchSaga(action){
    const {details,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/branch`, details);
        yield put(createBranchSuccess(response.data))
        navigate('/branches')
    } catch (error) {
        yield put(createBranchFailure(error.message))
    }
}

function* branchSaga(){
    yield takeLatest(fetchBranchRequest.type, fetchBranchSaga)
    yield takeLatest(fetchBranchByIdRequest.type, fetchBranchByIdSaga)
    yield takeLatest(createBranchRequest.type, createBranchSaga)
}

export default branchSaga