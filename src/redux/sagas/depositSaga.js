import {call, put,all, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDepositRequest,
    fetchDepositSuccess,
    fetchDepositFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchSubAccountDepositRequest,
    fetchSubAccountDepositSuccess,
    fetchSubAccountDepositFailure,
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure
} from '../slices/depositSlice'
import { url } from './url'

 function* fetchDepositSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount/deposit`)
        yield put(fetchDepositSuccess(response.data))
    } catch (error) {
        yield put(fetchDepositFailure(error.response.data.message))
    }
}
 function* fetchSubAccountDepositSaga(action){
    const {customerId} = action.payload
    try {
        const response = yield call(axios.get,`${url}/api/dsaccount/${customerId}`);
        yield put(fetchSubAccountDepositSuccess(response.data))
    } catch (error) {
        yield put(fetchSubAccountDepositFailure(error.response.data.message))
    }
}

function* createDepositSaga(action) {
    const { details } = action.payload;
  
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make deposit request
      const response = yield call(
        axios.post,
        `${url}/api/dsaccount/deposit`,
        details,
        config
      );
  
      // Dispatch deposit success action
      yield put(createDepositSuccess(response.data));
      // After deposit, refresh customer account details
      yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      yield put(createDepositFailure(errorMessage));
    }
  }
  function* createWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount/withdrawal`, details,config);
        console.log("errrror",response.data)
        yield put(createWithdrawalSuccess(response.data))
           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createWithdrawalFailure(errorMessage))
    }
}
  function* createMainWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log("33",details)
        const response = yield call(axios.post,`${url}/api/dsaccount/mainwithdrawal`, details,config);
        yield put(createMainWithdrawalSuccess(response.data))
           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        console.log("errrror",response.data)
        // navigate('/deposit')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.message
        yield put(createMainWithdrawalFailure(errorMessage))
    }
}
function* createCustomerAccountSaga(action){
    const {details,navigate} = action.payload
    console.log("44",details)
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount`, details,config);
        yield put(createCustomerAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        navigate('/deposit')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.error
        yield put(createCustomerAccountFailure(errorMessage))
    }
}
function* editCustomerAccountSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/dsaccount`, details,config);
        yield put(editCustomerAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerAccountFailure(error.message))
    }
}
  
  function* fetchCustomerAccountSaga(action) {
    const { customerId } = action.payload;
    try {
      // Fetch all required data in parallel
      const [accountResponse, customerResponse, dsAccountResponse] = yield all([
        call(axios.post, `${url}/api/account/${customerId}`),
        call(axios.get, `${url}/api/customer/${customerId}`),
        call(axios.get, `${url}/api/dsaccount/${customerId}`),
      ]);
  
      // Store customer ID and name in local storage
      localStorage.setItem("customerId", customerId);
      localStorage.setItem("customerName", customerResponse.data.name);
  
      // Dispatch success action with all fetched data
      yield put(
        fetchCustomerAccountSuccess({
          account: accountResponse.data,
          customer: customerResponse.data,
          subAccount: dsAccountResponse.data,
        })
      );
  
    } catch (error) {
      console.error("Customer Account Fetch Error:", error.message);
      yield put(fetchCustomerAccountFailure(error.message));
    }
  }

function* depositSaga(){
    yield takeLatest(fetchDepositRequest.type, fetchDepositSaga)
    yield takeLatest(fetchSubAccountDepositRequest.type, fetchSubAccountDepositSaga)
    yield takeLatest(createDepositRequest.type, createDepositSaga)
    yield takeLatest(fetchCustomerAccountRequest.type, fetchCustomerAccountSaga)
    yield takeLatest(createMainWithdrawalRequest.type, createMainWithdrawalSaga)
    yield takeLatest(createWithdrawalRequest.type, createWithdrawalSaga)
    yield takeLatest(createCustomerAccountRequest.type, createCustomerAccountSaga)
    yield takeLatest(editCustomerAccountRequest.type, editCustomerAccountSaga)
}

export default depositSaga