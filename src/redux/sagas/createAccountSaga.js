import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
// import {
//     fetchCustomerByIdSuccess,
// } from '../slices/customerSlice'
import {
    fetchAllCustomerAccountRequest,
    fetchAllCustomerAccountSuccess,
    fetchAllCustomerAccountFailure,
    fetchAccountTransactionRequest,
    fetchAccountTransactionSuccess,
    fetchAccountTransactionFailure,
    // fetchCustomerAccountRequest,
    // fetchCustomerAccountSuccess,
    // fetchCustomerAccountFailure,
    // fetchCustomerSubAccountRequest,
    // fetchCustomerSubAccountSuccess,
    // fetchCustomerSubAccountFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure
} from '../slices/createAccountSlice'
import { url } from './url'

 function* fetchAllCustomerAccountSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount`)
        yield put(fetchAllCustomerAccountSuccess(response.data))
    } catch (error) {
        yield put(fetchAllCustomerAccountFailure(error.response.data.message))
    }
}
 function* fetchAccountTransactionSaga(action){

  const { accountTypeId } = action.payload;

    try {
        const response = yield call(axios.get, `${url}/api/customertransaction/${accountTypeId}`)
        console.log("transaction",response)
        yield put(fetchAccountTransactionSuccess(response.data))
    } catch (error) {
        yield put(fetchAccountTransactionFailure(error.response.data.message))
    }
}
// function* fetchCustomerAccountSaga(action) {
//   const { customerId } = action.payload;
//   try {
//     // Fetch customer account details
//     const accountResponse = yield call(axios.post, `${url}/api/account/${customerId}`);

//     // Store account details in localStorage
//     const { ledgerBalance, availableBalance, accountNumber, _id } = accountResponse.data;
//     localStorage.setItem("customerId", customerId);
//     localStorage.setItem("mainAccountId", _id);
//     localStorage.setItem("accountNumber", accountNumber);
//     localStorage.setItem("ledgerBalance", ledgerBalance);
//     localStorage.setItem("availableBalance", availableBalance);

//        // Clear old DS account data in localStorage
//        localStorage.setItem("accountId", "");
//        localStorage.setItem("DSAccountNumber", "");
//        localStorage.setItem("balance", "");

//     try {
//       // Fetch DS account details using customerId
//       const response = yield call(axios.get, `${url}/api/customer/${customerId}`)
//               yield put(fetchCustomerByIdSuccess(response.data))
//       localStorage.setItem('customerName', response.data.name);
//       const dsAccountResponse = yield call(axios.get, `${url}/api/dsaccount/${customerId}`);
//       const { _id: accountId, DSAccountNumber, totalContribution: balance } = dsAccountResponse.data;

//       // Store DS account details in localStorage
//       localStorage.setItem("accountId", accountId);
//       localStorage.setItem("DSAccountNumber", DSAccountNumber);
//       localStorage.setItem("balance", balance);

//       // Dispatch DS account success action
//     //   yield put(fetchCustomerSubAccountSuccess(dsAccountResponse.data));
//     } catch (dsError) {
//       console.error("DS Account Fetch Error:", dsError.message);
//       // Proceed without DS account data
//     }

//     // Dispatch customer account success action
//     yield put(fetchCustomerAccountSuccess(accountResponse.data));

//     // Navigate to the customer account dashboard
//     // navigate("/customeraccountdashboard");
//   } catch (error) {
//     // Dispatch failure action with error message
//     yield put(fetchCustomerAccountFailure(error.message));
//   }
// }
//  function* fetchCustomerSubAccountSaga(action){

//     const {customerId} = action.payload
    
//     try {
//         // const token = localStorage.getItem('authToken');
//         // const config = {
//         //     headers: {
//         //         Authorization: `Bearer ${token}`
//         //     }
//         // }
//         const response = yield call(axios.get,`${url}/api/dsaccount/${customerId}`);
//         console.log("saga ds",response.data)
//         localStorage.setItem('accountId', response.data._id);
//         localStorage.setItem('DSAccountNumber', response.data.DSAccountNumber);
//         localStorage.setItem('balance', response.data.totalContribution);
//         yield put(fetchCustomerSubAccountSuccess(response.data))
//         // navigate('/customeraccountdashboard')
//     } catch (error) {
//         yield put(fetchCustomerSubAccountFailure(error.message))
//     }
 
// }
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
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerAccountFailure(error.message))
    }
}

function* customerAccountSaga(){
    yield takeLatest(fetchAllCustomerAccountRequest.type, fetchAllCustomerAccountSaga)
    yield takeLatest(fetchAccountTransactionRequest.type, fetchAccountTransactionSaga)
    // yield takeLatest(fetchCustomerAccountRequest.type, fetchCustomerAccountSaga)
    // yield takeLatest(fetchCustomerSubAccountRequest.type, fetchCustomerSubAccountSaga)
    yield takeLatest(createCustomerAccountRequest.type, createCustomerAccountSaga)
    yield takeLatest(editCustomerAccountRequest.type, editCustomerAccountSaga)
}

export default customerAccountSaga