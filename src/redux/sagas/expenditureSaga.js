import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  
    createExpenditureRequest,
    createExpenditureSuccess,
    createExpenditureFailure
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

function* expenditureSaga(){

    yield takeLatest(createExpenditureRequest.type, createExpenditureSaga)
}

export default expenditureSaga