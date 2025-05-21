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
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/branch`,config)
        yield put(fetchBranchSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchFailure(error.response.data.message))
    }
}
 function* fetchBranchByIdSaga(action){
    const {branchId} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/branch/${branchId}`,config)
        yield put(fetchBranchByIdSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchByIdFailure(error.response.data.message))
    }
}
function* createBranchSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post,`${url}/api/branch`, details,config);
        yield put(createBranchSuccess(response.data))
        navigate('/branches')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(createBranchFailure(error.message))
    }
}

function* branchSaga(){
    yield takeLatest(fetchBranchRequest.type, fetchBranchSaga)
    yield takeLatest(fetchBranchByIdRequest.type, fetchBranchByIdSaga)
    yield takeLatest(createBranchRequest.type, createBranchSaga)
}

export default branchSaga