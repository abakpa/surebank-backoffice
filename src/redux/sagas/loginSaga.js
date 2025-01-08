import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    loginRequest, 
    loginSuccess, 
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} from '../slices/loginSlice';
import { url } from './url';
function* loginSaga(action){
    const {credentials,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/login/staff`, credentials);
        const { token,staff } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('staffId', staff.id);
        localStorage.setItem('staffEmail', staff.email);
        yield put(loginSuccess(response.data))
        navigate('/content')
    } catch (error) {
        yield put(loginFailure(error.message))
    }
}
function* logoutSaga(action){
    const { navigate } = action.payload;
    try {
        // Clear user data from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('staffId');
        localStorage.removeItem('staffEmail');
        navigate('/content');

        // Dispatch logout success action
        yield put(logoutSuccess());

        // Navigate to login page
    } catch (error) {
        yield put(logoutFailure(error.message));
    }
}

function* authSaga(){
    yield takeLatest(loginRequest.type, loginSaga)
    yield takeLatest(logoutRequest.type, logoutSaga)
}

export default authSaga;