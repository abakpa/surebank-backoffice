import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchCustomerRequest,
    fetchCustomerSuccess,
    fetchCustomerFailure,
    fetchCustomerLoginCountRequest,
    fetchCustomerLoginCountSuccess,
    fetchCustomerLoginCountFailure,
    fetchBranchCustomerLoginCountRequest,
    fetchBranchCustomerLoginCountSuccess,
    fetchBranchCustomerLoginCountFailure,
    fetchRepCustomerLoginCountRequest,
    fetchRepCustomerLoginCountSuccess,
    fetchRepCustomerLoginCountFailure,
    fetchCustomerWithdrawalRequestRequest,
    fetchCustomerWithdrawalRequestSuccess,
    fetchCustomerWithdrawalRequestFailure,
    fetchBranchCustomerWithdrawalRequestRequest,
    fetchBranchCustomerWithdrawalRequestSuccess,
    fetchBranchCustomerWithdrawalRequestFailure,
    fetchRepCustomerWithdrawalRequestRequest,
    fetchRepCustomerWithdrawalRequestSuccess,
    fetchRepCustomerWithdrawalRequestFailure,
    updateCustomerWithdrawalRequestRequest,
    updateCustomerWithdrawalRequestSuccess,
    updateCustomerWithdrawalRequestFailure,
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
 function* fetchCustomerLoginCountSaga(){
    try {
        // const token = localStorage.getItem('authToken');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        const response = yield call(axios.get, `${url}/api/login/customercount`)
        yield put(fetchCustomerLoginCountSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchCustomerLoginCountFailure(error.response.data.message))
    }
}
 function* fetchBranchCustomerLoginCountSaga(){
    try {
      const branchId = localStorage.getItem('staffBranch');
        // const token = localStorage.getItem('authToken');
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        const response = yield call(axios.get, `${url}/api/login/branchcustomercount/${branchId}`)
        console.log("branch count",response)
        yield put(fetchBranchCustomerLoginCountSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchCustomerLoginCountFailure(error.response.data.message))
    }
}
 function* fetchRepCustomerLoginCountSaga(){
    try {
      // const branchId = localStorage.getItem('staffBranch');
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/login/repcustomercount`,config)
        console.log("branch count",response)
        yield put(fetchRepCustomerLoginCountSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepCustomerLoginCountFailure(error.response.data.message))
    }
}
 function* fetchCustomerWithdrawalRequestSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("request111",config)

        const response = yield call(axios.get, `${url}/api/customerwithdrawalrequest`,config)
        console.log("request",response)
        yield put(fetchCustomerWithdrawalRequestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchCustomerWithdrawalRequestFailure(error.response.data.message))
    }
}
 function* fetchBranchCustomerWithdrawalRequestSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const branchId = localStorage.getItem('staffBranch');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("request111",config)

        const response = yield call(axios.get, `${url}/api/customerwithdrawalrequest/branchcustomer/${branchId}`,config)
        console.log("request",response)
        yield put(fetchBranchCustomerWithdrawalRequestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchCustomerWithdrawalRequestFailure(error.response.data.message))
    }
}
 function* fetchRepCustomerWithdrawalRequestSaga(){
    try {
        const token = localStorage.getItem('authToken');
        // const branchId = localStorage.getItem('staffBranch');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("request111",config)

        const response = yield call(axios.get, `${url}/api/customerwithdrawalrequest/repcustomer`,config)
        console.log("request",response)
        yield put(fetchRepCustomerWithdrawalRequestSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepCustomerWithdrawalRequestFailure(error.response.data.message))
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
function*  updateCustomerWithdrawalRequestSaga(action){
    const {withdrawalRequestId} = action.payload.details
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.put,`${url}/api/customerwithdrawalrequest/${withdrawalRequestId}`,{},config );
        yield put( updateCustomerWithdrawalRequestSuccess(response.data))
        yield call (fetchCustomerWithdrawalRequestSaga);
        // yield call (fetchCustomerSaga);
        // navigate('/staff')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put( updateCustomerWithdrawalRequestFailure(error.response.data.message))
    }
}


function* customerSaga(){
    yield takeLatest(fetchCustomerRequest.type, fetchCustomerSaga)
    yield takeLatest(fetchCustomerLoginCountRequest.type, fetchCustomerLoginCountSaga)
    yield takeLatest(fetchBranchCustomerLoginCountRequest.type, fetchBranchCustomerLoginCountSaga)
    yield takeLatest(fetchRepCustomerLoginCountRequest.type, fetchRepCustomerLoginCountSaga)
    yield takeLatest(fetchCustomerWithdrawalRequestRequest.type, fetchCustomerWithdrawalRequestSaga)
    yield takeLatest(fetchBranchCustomerWithdrawalRequestRequest.type, fetchBranchCustomerWithdrawalRequestSaga)
    yield takeLatest(fetchRepCustomerWithdrawalRequestRequest.type, fetchRepCustomerWithdrawalRequestSaga)
    yield takeLatest(fetchBranchCustomerRequest.type, fetchBranchCustomerSaga)
    yield takeLatest(fetchRepCustomerRequest.type, fetchRepCustomerSaga)
    yield takeLatest(fetchCustomerByIdRequest.type, fetchCustomerByIdSaga)
    yield takeLatest(createCustomerRequest.type, createCustomerSaga)
    yield takeLatest(transferAllCustomerRequest.type, transferAllCustomerSaga)
    yield takeLatest(transferCustomerRequest.type, transferCustomerSaga)
    yield takeLatest(resetCustomerPasswordRequest.type, resetCustomerPasswordSaga)
    yield takeLatest(updatePasswordRequest.type, updatePasswordSaga)
    yield takeLatest( updateCustomerWithdrawalRequestRequest.type,  updateCustomerWithdrawalRequestSaga)
    
}

export default customerSaga