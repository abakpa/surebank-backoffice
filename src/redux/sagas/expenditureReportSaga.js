import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchExpenditureRequest,
    fetchExpenditureSuccess,
    fetchExpenditureFailure,
    fetchBranchExpenditureRequest,
    fetchBranchExpenditureSuccess,
    fetchBranchExpenditureFailure,
    fetchRepExpenditureRequest,
    fetchRepExpenditureSuccess,
    fetchRepExpenditureFailure,
    deleteExpenditureRequest,
    deleteExpenditureSuccess,
    deleteExpenditureFailure,

} from '../slices/expenditureReportSlice'
import { url } from './url'

function* fetchExpenditureSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.post, `${url}/api/admindashboard/expenditurereport`,{},config)
        yield put(fetchExpenditureSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchExpenditureFailure(error.response.data.message))
    }
}
function* fetchBranchExpenditureSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/managerdashboard/branchexpenditurereport`,{},config)
        yield put(fetchBranchExpenditureSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchExpenditureFailure(error.response.data.message))
    }
}
// Saga: Delete Expenditure
function* deleteExpenditureSaga(action) {
    console.log("action",action.payload)
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // API call (soft delete)
    const response = yield call(
      axios.put,
      `${url}/api/admindashboard/deleteexpenditure/${action.payload}`,{}, // expenditureId comes from action.payload
      config
    );

    // Dispatch success with deleted record
    yield put(deleteExpenditureSuccess(response.data));
    yield call(fetchExpenditureSaga)
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    yield put(
      deleteExpenditureFailure(
        error.response?.data?.message || "Failed to delete expenditure"
      )
    );
  }
}
function* fetchRepExpenditureSaga(staffId){

    const role = localStorage.getItem('staffRole');
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (role === 'Agent') {
            const response = yield call(axios.post, `${url}/api/repdashboard/repexpenditurereport`,{},config)
            yield put(fetchRepExpenditureSuccess(response.data))
          } else {
            
            const response = yield call(axios.post, `${url}/api/mvrepdashboard/repexpenditurereport/${staffId.payload}`,{},config)
            yield put(fetchRepExpenditureSuccess(response.data))
          }
        
       
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepExpenditureFailure(error.response.data.message))
    }
}


function* expenditurereportSaga(){
    yield takeLatest(fetchExpenditureRequest.type, fetchExpenditureSaga)
    yield takeLatest(fetchBranchExpenditureRequest.type, fetchBranchExpenditureSaga)
    yield takeLatest(fetchRepExpenditureRequest.type, fetchRepExpenditureSaga)
    yield takeLatest(deleteExpenditureRequest.type, deleteExpenditureSaga)
  
}

export default expenditurereportSaga