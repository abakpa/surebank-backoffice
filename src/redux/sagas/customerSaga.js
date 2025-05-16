import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchCustomerRequest,
    fetchCustomerSuccess,
    fetchCustomerFailure,
    fetchBranchCustomerRequest,
    fetchBranchCustomerSuccess,
    fetchBranchCustomerFailure,
    fetchRepCustomerRequest,
    fetchRepCustomerSuccess,
    fetchRepCustomerFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    createCustomerRequest,
    createCustomerSuccess,
    createCustomerFailure
} from '../slices/customerSlice'
import { url } from './url'

 function* fetchCustomerSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/customer`)
        yield put(fetchCustomerSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerFailure(error.response.data.message))
    }
}
 function* fetchBranchCustomerSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/customer/branchcustomer`, {},config)
        yield put(fetchBranchCustomerSuccess(response.data))
    } catch (error) {
        yield put(fetchBranchCustomerFailure(error.response.data.message))
    }
}
 function* fetchRepCustomerSaga(action){
    try {
        const role = localStorage.getItem('staffRole');
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log("LLLLLL",action.payload)

        if(role==='Agent'){
        const response = yield call(axios.post, `${url}/api/customer/repcustomer`, {},config)
        yield put(fetchRepCustomerSuccess(response.data))
        }else{
            const response = yield call(axios.post, `${url}/api/mvrepdashboard/repcustomer/${action.payload}`, {},config)
        yield put(fetchRepCustomerSuccess(response.data))
        }
    } catch (error) {
        yield put(fetchRepCustomerFailure(error.response.data.message))
    }
}
 function* fetchCustomerByIdSaga(action){
const {customerId} = action.payload
    try {

        const response = yield call(axios.get, `${url}/api/customer/${customerId}`)
        localStorage.setItem('customerName', response.data.name);
        yield put(fetchCustomerByIdSuccess(response.data))
    } catch (error) {
        yield put(fetchCustomerByIdFailure(error.response.data.message))
    }
}
function* createCustomerSaga(action) {
    const { details, navigate } = action.payload;
    const role = localStorage.getItem('staffRole');
  
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = yield call(axios.post, `${url}/api/customer`, details, config);
      yield put(createCustomerSuccess(response.data));
  
      // Navigate based on role
      if (role === 'Agent') {
        navigate('/repcustomers');
      } else if (role === 'Manager') {
        navigate('/branchcustomers');
      } else {
        navigate('/customers');
      }
  
    } catch (error) {
      console.error('Customer creation error:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred while creating the customer.';
      yield put(createCustomerFailure(errorMessage));
    }
  }

function* customerSaga(){
    yield takeLatest(fetchCustomerRequest.type, fetchCustomerSaga)
    yield takeLatest(fetchBranchCustomerRequest.type, fetchBranchCustomerSaga)
    yield takeLatest(fetchRepCustomerRequest.type, fetchRepCustomerSaga)
    yield takeLatest(fetchCustomerByIdRequest.type, fetchCustomerByIdSaga)
    yield takeLatest(createCustomerRequest.type, createCustomerSaga)
}

export default customerSaga