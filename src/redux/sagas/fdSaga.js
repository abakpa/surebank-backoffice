import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchFDRequest,
    fetchFDSuccess,
    fetchFDFailure,
    fetchBranchFDRequest,
    fetchBranchFDSuccess,
    fetchBranchFDFailure,
    fetchInterestRequest,
    fetchInterestSuccess,
    fetchInterestFailure,
    createInterestRequest,
    createInterestSuccess,
    createInterestFailure,
     updateInterestRequest,
     updateInterestSuccess,
     updateInterestFailure,

} from '../slices/fdSlice'
import { url } from './url'

function* fetchFDSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/admindashboard/fdreport`,{},config)
        console.log("fd",response)
        yield put(fetchFDSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchFDFailure(error.response.data.message))
    }
}
function* fetchInterestSaga(){

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/fdaccount/getinterest`,{},config)
        yield put(fetchInterestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchInterestFailure(error.response.data.message))
    }
}
function* createInterestSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/fdaccount/interest`,details,config)
        yield put(createInterestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(createInterestFailure(error.response.data.message))
    }
}
function* updateInterestSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put, `${url}/api/fdaccount/interest`,details,config)
        yield put(updateInterestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(updateInterestFailure(error.response.data.message))
    }
}


function* FDreportSaga(){
    yield takeLatest(fetchFDRequest.type, fetchFDSaga)
    yield takeLatest(fetchInterestRequest.type, fetchInterestSaga)
    yield takeLatest(createInterestRequest.type, createInterestSaga)
    yield takeLatest(updateInterestRequest.type, updateInterestSaga)
    yield takeLatest(fetchBranchFDRequest.type, fetchBranchFDSaga)
  
}

export default FDreportSaga