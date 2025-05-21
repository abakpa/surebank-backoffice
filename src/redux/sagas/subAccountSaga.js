import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

import {
    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,

} from '../slices/subAccountSlice'
import { url } from './url'
 function* fetchCustomerSubAccountSaga(action){

    const {customerId} = action.payload
    
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get,`${url}/api/dsaccount/${customerId}`,{},config);
        console.log("saga123 ds",response.data)
        yield put(fetchCustomerSubAccountSuccess(response.data))
        // navigate('/customeraccountdashboard')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchCustomerSubAccountFailure(error.message))
    }
 
}


function* subAccountSaga(){

    yield takeLatest(fetchCustomerSubAccountRequest.type, fetchCustomerSubAccountSaga)
}

export default subAccountSaga