import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,
    disableAllStaffRequest,
    disableAllStaffSuccess,
    disableAllStaffFailure,
    activateAllStaffRequest,
    activateAllStaffSuccess,
    activateAllStaffFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    createStaffRequest,
    createStaffSuccess,
    createStaffFailure,
    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure,
    resetStaffPasswordRequest,
  resetStaffPasswordSuccess,
  resetStaffPasswordFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure
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
 function* disableAllStaffSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/login/staff/block-all-users`,{},config)
        yield put(disableAllStaffSuccess(response.data))
        yield call (fetchStaffSaga)
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(disableAllStaffFailure(error.response.data.message))
    }
}
 function* activateAllStaffSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/login/staff/unblock-all-users`,{},config)
        yield put(activateAllStaffSuccess(response.data))
        yield call (fetchStaffSaga)
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(activateAllStaffFailure(error.response.data.message))
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
    const role = localStorage.getItem("staffRole");
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post,`${url}/api/staff`, details,config);
        yield put(createStaffSuccess(response.data))
        if(role === 'Admin'){
        navigate('/staff')
        }else{
          navigate('/branchstaff')
        }
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
function* resetStaffPasswordSaga(action){
    const {staffId} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.put,`${url}/api/staff/password/${staffId}`,{},config );
        yield put(resetStaffPasswordSuccess(response.data))
        yield call (fetchBranchStaffSaga);
        yield call (fetchStaffSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(resetStaffPasswordFailure(error.message))
    }
}
function* updatePasswordSaga(action){
    const {staffId,email,newPassword} = action.payload
    const details = {email,newPassword}
    try {
        // const token = localStorage.getItem('authToken');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        const response = yield call(axios.put,`${url}/api/staff/forgotpassword/${staffId}`,details );
        yield put(updatePasswordSuccess(response.data))
        yield call (fetchBranchStaffSaga);
        yield call (fetchStaffSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(updatePasswordFailure(error.message))
    }
}

function* staffSaga(){
    yield takeLatest(fetchStaffRequest.type, fetchStaffSaga)
    yield takeLatest(disableAllStaffRequest.type, disableAllStaffSaga)
    yield takeLatest(activateAllStaffRequest.type, activateAllStaffSaga)
    yield takeLatest(fetchBranchStaffRequest.type, fetchBranchStaffSaga)
    yield takeLatest(createStaffRequest.type, createStaffSaga)
    yield takeLatest(updateStaffRequest.type, updateStaffSaga)
    yield takeLatest(resetStaffPasswordRequest.type, resetStaffPasswordSaga)
    yield takeLatest(updatePasswordRequest.type, updatePasswordSaga)
}

export default staffSaga