import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    createStaffRequest,
    createStaffSuccess,
    createStaffFailure
} from '../slices/staffSlice'
import { url } from './url'

 function* fetchStaffSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/staff`)
        yield put(fetchStaffSuccess(response.data))
    } catch (error) {
        yield put(fetchStaffFailure(error.response.data.message))
    }
}
 function* fetchBranchStaffSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/staff/branchstaff`,{},config)
        yield put(fetchBranchStaffSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchStaffFailure(error.response.data.message))
    }
}
function* createStaffSaga(action){
    const {details,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/staff`, details);
        yield put(createStaffSuccess(response.data))
        navigate('/staff')
    } catch (error) {
        yield put(createStaffFailure(error.message))
    }
}

function* staffSaga(){
    yield takeLatest(fetchStaffRequest.type, fetchStaffSaga)
    yield takeLatest(fetchBranchStaffRequest.type, fetchBranchStaffSaga)
    yield takeLatest(createStaffRequest.type, createStaffSaga)
}

export default staffSaga