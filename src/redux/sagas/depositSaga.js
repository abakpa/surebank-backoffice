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
    createSBDepositRequest,
    createSBDepositSuccess,
    createSBDepositFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createSBWithdrawalRequest,
    createSBWithdrawalSuccess,
    createSBWithdrawalFailure,
    createSBSellProductRequest,
    createSBSellProductSuccess,
    createSBSellProductFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    createCustomerSBAccountRequest,
    createCustomerSBAccountSuccess,
    createCustomerSBAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure,
    editCustomerSBAccountRequest,
    editCustomerSBAccountSuccess,
    editCustomerSBAccountFailure
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
function* createSBDepositSaga(action) {
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
        `${url}/api/sbaccount/deposit`,
        details,
        config
      );
  
      // Dispatch deposit success action
      yield put(createSBDepositSuccess(response.data));
      // After deposit, refresh customer account details
      yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      yield put(createSBDepositFailure(errorMessage));
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
        yield put(createWithdrawalSuccess(response.data))
           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createWithdrawalFailure(errorMessage))
    }
}
  function* createSBWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount/withdrawal`, details,config);
        yield put(createSBWithdrawalSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createSBWithdrawalFailure(errorMessage))
    }
}
  function* createSBSellProductSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount/sellproduct`, details,config);
        yield put(createSBSellProductSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createSBSellProductFailure(errorMessage))
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
        // navigate('/deposit')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.message
        yield put(createMainWithdrawalFailure(errorMessage))
    }
}
function* createCustomerAccountSaga(action){
    const {details,navigate} = action.payload
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
        const errorMessage = error.response?.data?.error
        yield put(createCustomerAccountFailure(errorMessage))
    }
}
function* createCustomerSBAccountSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount`, details,config);
        yield put(createCustomerSBAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createCustomerSBAccountFailure(errorMessage))
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
function* editCustomerSBAccountSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/sbaccount`, details,config);
        yield put(editCustomerSBAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerSBAccountFailure(error.message))
    }
}
  
function* fetchCustomerAccountSaga(action) {
  const { customerId } = action.payload;
  try {
    // Fetch all required data in parallel
    const [accountResponse, customerResponse, dsAccountResponse, sbAccountResponse] = yield all([
      call(axios.post, `${url}/api/account/${customerId}`),
      call(axios.get, `${url}/api/customer/${customerId}`),
      call(axios.get, `${url}/api/dsaccount/${customerId}`),
      call(axios.get, `${url}/api/sbaccount/${customerId}`),
    ]);

    // Combine dsAccountResponse and sbAccountResponse into one object
    const subAccount = {
      dsAccount: dsAccountResponse.data,
      sbAccount: sbAccountResponse.data,
    };

    // Store customer ID and name in local storage
    localStorage.setItem("customerId", customerId);
    localStorage.setItem("customerName", customerResponse.data.name);

    // Dispatch success action with all fetched data
    yield put(
      fetchCustomerAccountSuccess({
        account: accountResponse.data,
        customer: customerResponse.data,
        subAccount, // Combined object
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
    yield takeLatest(createSBDepositRequest.type, createSBDepositSaga)
    yield takeLatest(fetchCustomerAccountRequest.type, fetchCustomerAccountSaga)
    yield takeLatest(createMainWithdrawalRequest.type, createMainWithdrawalSaga)
    yield takeLatest(createWithdrawalRequest.type, createWithdrawalSaga)
    yield takeLatest(createSBWithdrawalRequest.type, createSBWithdrawalSaga)
    yield takeLatest(createSBSellProductRequest.type, createSBSellProductSaga)
    yield takeLatest(createCustomerAccountRequest.type, createCustomerAccountSaga)
    yield takeLatest(createCustomerSBAccountRequest.type, createCustomerSBAccountSaga)
    yield takeLatest(editCustomerAccountRequest.type, editCustomerAccountSaga)
    yield takeLatest(editCustomerSBAccountRequest.type, editCustomerSBAccountSaga)
}

export default depositSaga