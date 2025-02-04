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
    createDepositFailure
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
}

export default depositSaga