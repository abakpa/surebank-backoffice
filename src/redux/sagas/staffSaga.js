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
    createStaffFailure,
    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure
} from '../slices/staffSlice'
import { url } from './url'

 function* fetchStaffSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/staff`,config)
        yield put(fetchStaffSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
        console.log("config",config)
        const response = yield call(axios.get, `${url}/api/staff/branchstaff`,config)
        yield put(fetchBranchStaffSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchStaffFailure(error.response.data.message))
    }
}
function* createStaffSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post,`${url}/api/staff`, details,config);
        yield put(createStaffSuccess(response.data))
        navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(createStaffFailure(error.message))
    }
}
function* updateStaffSaga(action){
    console.log(action.payload)
    const {staffId,status} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.put,`${url}/api/staff/${staffId}?status=${status}`,{},config );
        yield put(updateStaffSuccess(response.data))
        yield call (fetchBranchStaffSaga);
        yield call (fetchStaffSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(updateStaffFailure(error.message))
    }
}

function* staffSaga(){
    yield takeLatest(fetchStaffRequest.type, fetchStaffSaga)
    yield takeLatest(fetchBranchStaffRequest.type, fetchBranchStaffSaga)
    yield takeLatest(createStaffRequest.type, createStaffSaga)
    yield takeLatest(updateStaffRequest.type, updateStaffSaga)
}

export default staffSaga