import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDSContributionRequest,
    fetchDSContributionSuccess,
    fetchDSContributionFailure,
    fetchSBContributionRequest,
    fetchSBContributionSuccess,
    fetchSBContributionFailure,
    fetcTotalSBandDSRequest,
    fetcTotalSBandDSSuccess,
    fetcTotalSBandDSFailure,
    fetchDSDailyContributionRequest,
    fetchDSDailyContributionSuccess,
    fetchDSDailyContributionFailure,
    fetchSBDailyContributionRequest,
    fetchSBDailyContributionSuccess,
    fetchSBDailyContributionFailure,
    fetchTotalSBandDSDailyRequest,
    fetchTotalSBandDSDailySuccess,
    fetchTotalSBandDSDailyFailure,
    fetchDSWithdrawalRequest,
    fetchDSWithdrawalSuccess,
    fetchDSWithdrawalFailure,
    fetchDSpackageRequest,
    fetchDSpackageSuccess,
    fetchDSpackageFailure,
    fetchSBpackageRequest,
    fetchSBpackageSuccess,
    fetchSBpackageFailure,
    fetchPackageRequest,
    fetchPackageSuccess,
    fetchPackageFailure,
    fetchDSincomeRequest,
    fetchDSincomeSuccess,
    fetchDSincomeFailure,
    fetchSBincomeRequest,
    fetchSBincomeSuccess,
    fetchSBincomeFailure,
    fetchTotalincomeRequest,
    fetchTotalincomeSuccess,
    fetchTotalincomeFailure,
  
} from '../slices/dashboardSlice'
import { url } from './url'

function* fetchDSContributionSaga(action) {
    const { details = null } = action.payload; 

    try {
        const requestData = details ? details : {};
        const dsresponse = yield call(axios.get, `${url}/api/admindashboard/ds`, requestData);

        yield put(fetchDSContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchDSContributionFailure(error.dsresponse?.data?.message || "An error occurred"));
    }
}
function* fetchSBContributionSaga(action) {
    const { details1 = null } = action.payload; 

    try {
        const requestData = details1 ? details1 : {};
        const sbresponse = yield call(axios.get, `${url}/api/admindashboard/sb`, requestData);
        yield put(fetchSBContributionSuccess(sbresponse.data));
    } catch (error) {
        yield put(fetchSBContributionFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetcTotalSBandDSSaga(action) {
    const { details2 = null } = action.payload; 

    try {
        const requestData = details2 ? details2 : {};
        const sbresponse = yield call(axios.get, `${url}/api/admindashboard/totalsbandds`, requestData);
        yield put(fetcTotalSBandDSSuccess(sbresponse.data));
    } catch (error) {
        yield put(fetcTotalSBandDSFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchDSDailyContributionSaga(action) {
    const { details3 = null } = action.payload;

    try {
        const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailyds`, requestData);
        yield put(fetchDSDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchDSDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBDailyContributionSaga(action) {
    const { details4 = null } = action.payload;

    try {
        const requestData = details4 ? details4 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailysb`, requestData);
        yield put(fetchSBDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalSBandDSDailySaga(action) {
    const { details5 = null } = action.payload;

    try {
        const requestData = details5 ? details5 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/totaldailysbandds`, requestData);
        yield put(fetchTotalSBandDSDailySuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchTotalSBandDSDailyFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSWithdrawalSaga(action) {
    const { details6 = null } = action.payload;
    try {
        const requestData = details6 ? details6 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dswithdrawal`, requestData);
        yield put(fetchDSWithdrawalSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSpackageSaga(action) {
    const { details7 = null } = action.payload;

    try {
        const requestData = details7 ? details7 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dspackage`, requestData);
        yield put(fetchDSpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBpackageSaga(action) {
    const { details8 = null } = action.payload;

    try {
        const requestData = details8 ? details8 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/sbpackage`, requestData);
        yield put(fetchSBpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchSBpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchPackageSaga(action) {
    const { details9 = null } = action.payload;

    try {
        const requestData = details9 ? details9 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/packages`, requestData);
        yield put(fetchPackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSincomeSaga(action) {
    const { details10 = null } = action.payload;

    try {
        const requestData = details10 ? details10 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dsincome`, requestData);
        yield put(fetchDSincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchDSincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBincomeSaga(action) {
    const { details11 = null } = action.payload;

    try {
        const requestData = details11 ? details11 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/sbincome`, requestData);
        yield put(fetchSBincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchSBincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalincomeSaga(action) {
    const { details12 = null } = action.payload;

    try {
        const requestData = details12 ? details12 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/totalincome`, requestData);
        yield put(fetchTotalincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchTotalincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}




function* depositSaga(){

    yield takeLatest(fetchDSContributionRequest.type, fetchDSContributionSaga)
    yield takeLatest(fetchSBContributionRequest.type, fetchSBContributionSaga)
    yield takeLatest(fetcTotalSBandDSRequest.type, fetcTotalSBandDSSaga)
    yield takeLatest(fetchDSDailyContributionRequest.type, fetchDSDailyContributionSaga)
    yield takeLatest(fetchSBDailyContributionRequest.type, fetchSBDailyContributionSaga)
    yield takeLatest(fetchTotalSBandDSDailyRequest.type, fetchTotalSBandDSDailySaga)
    yield takeLatest(fetchDSWithdrawalRequest.type, fetchDSWithdrawalSaga)
    yield takeLatest(fetchDSpackageRequest.type, fetchDSpackageSaga)
    yield takeLatest(fetchSBpackageRequest.type, fetchSBpackageSaga)
    yield takeLatest(fetchPackageRequest.type, fetchPackageSaga)
    yield takeLatest(fetchDSincomeRequest.type, fetchDSincomeSaga)
    yield takeLatest(fetchSBincomeRequest.type, fetchSBincomeSaga)
    yield takeLatest(fetchTotalincomeRequest.type, fetchTotalincomeSaga)

}

export default depositSaga