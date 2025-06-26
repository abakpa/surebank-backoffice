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
    createCustomerFailure,
    transferCustomerRequest,
    transferCustomerSuccess,
    transferCustomerFailure,
    transferAllCustomerRequest,
    transferAllCustomerSuccess,
    transferAllCustomerFailure,
    resetCustomerPasswordRequest,
    resetCustomerPasswordSuccess,
    resetCustomerPasswordFailure,
    updatePasswordRequest,
   updatePasswordSuccess,
   updatePasswordFailure,

} from '../slices/customerSlice'
import { url } from './url'

 function* fetchCustomerSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/customer`,config)
        yield put(fetchCustomerSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
        const response = yield call(axios.get, `${url}/api/customer/branchcustomer`,config)
        yield put(fetchBranchCustomerSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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

        if(role==='Agent'){
        const response = yield call(axios.get, `${url}/api/customer/repcustomer`,config)
        yield put(fetchRepCustomerSuccess(response.data))
        }else{
            const response = yield call(axios.get, `${url}/api/mvrepdashboard/repcustomer/${action.payload}`,config)
        yield put(fetchRepCustomerSuccess(response.data))
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepCustomerFailure(error.response.data.message))
    }
}
 function* fetchCustomerByIdSaga(action){
const {customerId} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/customer/${customerId}`,config)
        localStorage.setItem('customerName', `${response.data.firstName} ${response.data.lastName}`);
        yield put(fetchCustomerByIdSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
      const errorMessage = error.response?.data?.error || 'An error occurred while creating the customer.';
      yield put(createCustomerFailure(errorMessage));
    }
  }
  function* transferAllCustomerSaga(action){
    const {oldStaff,newStaff} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.put,`${url}/api/customer/${oldStaff}?newStaff=${newStaff}`,{},config );
        yield put(transferAllCustomerSuccess(response.data))
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(transferAllCustomerFailure(error.message))
    }
}
function* transferCustomerSaga(action) {
    const { customer, newStaff, oldStaff } = action.payload;
  
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      // Make PUT request to transfer the customer
      const response = yield call(
        axios.put,
        `${url}/api/customer/newstaff/${customer}?newStaff=${newStaff}`,{},config
      );
  
      // Dispatch success action
      yield put(transferCustomerSuccess(response.data));
  
      // Fetch updated customer list for oldStaff (dispatch the action, not call the saga)
      yield put(fetchRepCustomerRequest(oldStaff));
  
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
      yield put(transferCustomerFailure(error.message || "Transfer failed"));
    }
  }
  function* resetCustomerPasswordSaga(action){
    console.log(action.payload)
    const {customerId} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.put,`${url}/api/customer/password/${customerId}`,{},config );
        yield put(resetCustomerPasswordSuccess(response.data))
        yield call (fetchBranchCustomerSaga);
        yield call (fetchCustomerSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(resetCustomerPasswordFailure(error.message))
    }
}
function* updatePasswordSaga(action){
    const {customerId,phone,newPassword} = action.payload
    const details = {phone,newPassword}
    try {
        // const token = localStorage.getItem('authToken');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        const response = yield call(axios.put,`${url}/api/customer/forgotpassword/${customerId}`,details );
        yield put(updatePasswordSuccess(response.data))
        yield call (fetchBranchCustomerSaga);
        yield call (fetchCustomerSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(updatePasswordFailure(error.message))
    }
}


function* customerSaga(){
    yield takeLatest(fetchCustomerRequest.type, fetchCustomerSaga)
    yield takeLatest(fetchBranchCustomerRequest.type, fetchBranchCustomerSaga)
    yield takeLatest(fetchRepCustomerRequest.type, fetchRepCustomerSaga)
    yield takeLatest(fetchCustomerByIdRequest.type, fetchCustomerByIdSaga)
    yield takeLatest(createCustomerRequest.type, createCustomerSaga)
    yield takeLatest(transferAllCustomerRequest.type, transferAllCustomerSaga)
    yield takeLatest(transferCustomerRequest.type, transferCustomerSaga)
    yield takeLatest(resetCustomerPasswordRequest.type, resetCustomerPasswordSaga)
    yield takeLatest(updatePasswordRequest.type, updatePasswordSaga)
    
}

export default customerSaga