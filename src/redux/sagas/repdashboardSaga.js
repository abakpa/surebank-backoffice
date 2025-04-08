import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchRepDSDailyContributionRequest,
    fetchRepDSDailyContributionSuccess,
    fetchRepDSDailyContributionFailure,
    fetchRepSBDailyContributionRequest,
    fetchRepSBDailyContributionSuccess,
    fetchRepSBDailyContributionFailure,
    fetchRepTotalSBandDSDailyRequest,
    fetchRepTotalSBandDSDailySuccess,
    fetchRepTotalSBandDSDailyFailure,
    fetchRepDSWithdrawalRequest,
    fetchRepDSWithdrawalSuccess,
    fetchRepDSWithdrawalFailure,
    fetchRepDSpackageRequest,
    fetchRepDSpackageSuccess,
    fetchRepDSpackageFailure,
    fetchRepSBpackageRequest,
    fetchRepSBpackageSuccess,
    fetchRepSBpackageFailure,
    fetchRepPackageRequest,
    fetchRepPackageSuccess,
    fetchRepPackageFailure,
  
} from '../slices/repdashboardSlice'
import { url } from './url'


function* fetchRepDSDailyContributionSaga(action) {
    const { details3 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/dailyrepds`, requestData, config);
        yield put(fetchRepDSDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepDSDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepSBDailyContributionSaga(action) {
    const { details4 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details4 ? details4 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/dailyrepsb`, requestData,config);
        yield put(fetchRepSBDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepTotalSBandDSDailySaga(action) {
    const { details5 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details5 ? details5 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/totaldailyrepcontribution`, requestData,config);
        yield put(fetchRepTotalSBandDSDailySuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepTotalSBandDSDailyFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepDSWithdrawalSaga(action) {
    const { details6 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details6 ? details6 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/dailyrepdswithdrawal`, requestData,config);
        yield put(fetchRepDSWithdrawalSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepDSpackageSaga(action) {
    const { details7 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details7 ? details7 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/repdspackage`, requestData,config);
        yield put(fetchRepDSpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepSBpackageSaga(action) {
    const { details8 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details8 ? details8 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/repsbpackage`, requestData,config);
        yield put(fetchRepSBpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepSBpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepPackageSaga(action) {
    const { details9 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details9 ? details9 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/reppackages`, requestData,config);
        yield put(fetchRepPackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchRepPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}




function* depositSaga(){

   
    yield takeLatest(fetchRepDSDailyContributionRequest.type, fetchRepDSDailyContributionSaga)
    yield takeLatest(fetchRepSBDailyContributionRequest.type, fetchRepSBDailyContributionSaga)
    yield takeLatest(fetchRepTotalSBandDSDailyRequest.type, fetchRepTotalSBandDSDailySaga)
    yield takeLatest(fetchRepDSWithdrawalRequest.type, fetchRepDSWithdrawalSaga)
    yield takeLatest(fetchRepDSpackageRequest.type, fetchRepDSpackageSaga)
    yield takeLatest(fetchRepSBpackageRequest.type, fetchRepSBpackageSaga)
    yield takeLatest(fetchRepPackageRequest.type, fetchRepPackageSaga)
   

}

export default depositSaga