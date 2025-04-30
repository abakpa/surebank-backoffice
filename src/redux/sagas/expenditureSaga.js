import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure,
    createBranchExpenditureRequest,
    createBranchExpenditureSuccess,
    createBranchExpenditureFailure,
    createRepExpenditureRequest,
    createRepExpenditureSuccess,
    createRepExpenditureFailure
} from '../slices/expenditureSlice'
import { url } from './url'


function* createExpenditureSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/expenditure`, details,config);
        yield put(createExpenditureSuccess(response.data))
        navigate('/expenditurereport')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createExpenditureFailure(errorMessage))
    }
}
function* createBranchExpenditureSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/expenditure`, details,config);
        yield put(createBranchExpenditureSuccess(response.data))
        navigate('/branchexpenditurereport')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createBranchExpenditureFailure(errorMessage))
    }
}
function* createRepExpenditureSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/expenditure`, details,config);
        yield put(createRepExpenditureSuccess(response.data))
        navigate('/repexpenditurereport')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createRepExpenditureFailure(errorMessage))
    }
}

function* expenditureSaga(){

    yield takeLatest(createExpenditureRequest.type, createExpenditureSaga)
    yield takeLatest(createBranchExpenditureRequest.type, createBranchExpenditureSaga)
    yield takeLatest(createRepExpenditureRequest.type, createRepExpenditureSaga)
}

export default expenditureSaga