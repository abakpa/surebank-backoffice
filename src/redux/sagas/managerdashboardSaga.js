import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchBranchDSContributionRequest,
    fetchBranchDSContributionSuccess,
    fetchBranchDSContributionFailure,
    fetchBranchSBContributionRequest,
    fetchBranchSBContributionSuccess,
    fetchBranchSBContributionFailure,
    fetcBranchTotalSBandDSRequest,
    fetcBranchTotalSBandDSSuccess,
    fetcBranchTotalSBandDSFailure,
    fetchBranchDSDailyContributionRequest,
    fetchBranchDSDailyContributionSuccess,
    fetchBranchDSDailyContributionFailure,
    fetchBranchSBDailyContributionRequest,
    fetchBranchSBDailyContributionSuccess,
    fetchBranchSBDailyContributionFailure,
    fetchBranchTotalSBandDSDailyRequest,
    fetchBranchTotalSBandDSDailySuccess,
    fetchBranchTotalSBandDSDailyFailure,
    fetchBranchDSWithdrawalRequest,
    fetchBranchDSWithdrawalSuccess,
    fetchBranchDSWithdrawalFailure,
    fetchBranchDSpackageRequest,
    fetchBranchDSpackageSuccess,
    fetchBranchDSpackageFailure,
    fetchBranchSBpackageRequest,
    fetchBranchSBpackageSuccess,
    fetchBranchSBpackageFailure,
    fetchBranchPackageRequest,
    fetchBranchPackageSuccess,
    fetchBranchPackageFailure,
    fetchBranchDSincomeRequest,
    fetchBranchDSincomeSuccess,
    fetchBranchDSincomeFailure,
    fetchBranchSBincomeRequest,
    fetchBranchSBincomeSuccess,
    fetchBranchSBincomeFailure,
    fetchBranchTotalincomeRequest,
    fetchBranchTotalincomeSuccess,
    fetchBranchTotalincomeFailure,
    fetchBranchTotalExpenditureRequest,
    fetchBranchTotalExpenditureSuccess,
    fetchBranchTotalExpenditureFailure,
    fetchBranchTotalProfitRequest,
    fetchBranchTotalProfitSuccess,
    fetchBranchTotalProfitFailure,
  
} from '../slices/managerdashboardSlice'
import { url } from './url'

function* fetchBranchDSContributionSaga(action) {
    const { details = null } = action.payload; 
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details ? details : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchds`, requestData,config);
        yield put(fetchBranchDSContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchDSContributionFailure(error.dsresponse?.data?.message || "An error occurred"));
    }
}
function* fetchBranchSBContributionSaga(action) {
    const { details1 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details1 ? details1 : {};
        const sbresponse = yield call(axios.post, `${url}/api/managerdashboard/branchsb`, requestData,config);
        yield put(fetchBranchSBContributionSuccess(sbresponse.data));
    } catch (error) {
        yield put(fetchBranchSBContributionFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetcBranchTotalSBandDSSaga(action) {
    const { details2 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details2 ? details2 : {};
        const sbresponse = yield call(axios.post, `${url}/api/managerdashboard/totalsbandds`, requestData,config);
        yield put(fetcBranchTotalSBandDSSuccess(sbresponse.data));
    } catch (error) {
        yield put(fetcBranchTotalSBandDSFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchBranchDSDailyContributionSaga(action) {
    const { details3 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/dailybranchds`, requestData, config);
        yield put(fetchBranchDSDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchDSDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchSBDailyContributionSaga(action) {
    const { details4 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details4 ? details4 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/dailybranchsb`, requestData,config);
        yield put(fetchBranchSBDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchTotalSBandDSDailySaga(action) {
    const { details5 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details5 ? details5 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/totaldailybranchcontribution`, requestData,config);
        yield put(fetchBranchTotalSBandDSDailySuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchTotalSBandDSDailyFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchDSWithdrawalSaga(action) {
    const { details6 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details6 ? details6 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/dailybranchdswithdrawal`, requestData,config);
        yield put(fetchBranchDSWithdrawalSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchDSpackageSaga(action) {
    const { details7 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details7 ? details7 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchdspackage`, requestData,config);
        yield put(fetchBranchDSpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchSBpackageSaga(action) {
    const { details8 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details8 ? details8 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchsbpackage`, requestData,config);
        yield put(fetchBranchSBpackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchSBpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchPackageSaga(action) {
    const { details9 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details9 ? details9 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchpackages`, requestData,config);
        yield put(fetchBranchPackageSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchDSincomeSaga(action) {
    const { details10 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details10 ? details10 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchdsincome`, requestData,config);
        yield put(fetchBranchDSincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchDSincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchSBincomeSaga(action) {
    const { details11 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details11 ? details11 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchsbincome`, requestData,config);
        yield put(fetchBranchSBincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchSBincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchTotalincomeSaga(action) {
    const { details12 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details12 ? details12 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchtotalincome`, requestData,config);
        yield put(fetchBranchTotalincomeSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchTotalincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchTotalExpenditureSaga(action) {
    const { details13 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details13 ? details13 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchtotalexpenditure`, requestData,config);
        yield put(fetchBranchTotalExpenditureSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchTotalExpenditureFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchBranchTotalProfitSaga(action) {
    const { details14 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details14 ? details14 : {};
        const dsresponse = yield call(axios.post, `${url}/api/managerdashboard/branchprofit`, requestData,config);
        yield put(fetchBranchTotalProfitSuccess(dsresponse.data));
    } catch (error) {
        yield put(fetchBranchTotalProfitFailure(error.response?.data?.message || "An error occurred"));
    }
}




function* depositSaga(){

    yield takeLatest(fetchBranchDSContributionRequest.type, fetchBranchDSContributionSaga)
    yield takeLatest(fetchBranchSBContributionRequest.type, fetchBranchSBContributionSaga)
    yield takeLatest(fetcBranchTotalSBandDSRequest.type, fetcBranchTotalSBandDSSaga)
    yield takeLatest(fetchBranchDSDailyContributionRequest.type, fetchBranchDSDailyContributionSaga)
    yield takeLatest(fetchBranchSBDailyContributionRequest.type, fetchBranchSBDailyContributionSaga)
    yield takeLatest(fetchBranchTotalSBandDSDailyRequest.type, fetchBranchTotalSBandDSDailySaga)
    yield takeLatest(fetchBranchDSWithdrawalRequest.type, fetchBranchDSWithdrawalSaga)
    yield takeLatest(fetchBranchDSpackageRequest.type, fetchBranchDSpackageSaga)
    yield takeLatest(fetchBranchSBpackageRequest.type, fetchBranchSBpackageSaga)
    yield takeLatest(fetchBranchPackageRequest.type, fetchBranchPackageSaga)
    yield takeLatest(fetchBranchDSincomeRequest.type, fetchBranchDSincomeSaga)
    yield takeLatest(fetchBranchSBincomeRequest.type, fetchBranchSBincomeSaga)
    yield takeLatest(fetchBranchTotalincomeRequest.type, fetchBranchTotalincomeSaga)
    yield takeLatest(fetchBranchTotalExpenditureRequest.type, fetchBranchTotalExpenditureSaga)
    yield takeLatest(fetchBranchTotalProfitRequest.type, fetchBranchTotalProfitSaga)

}

export default depositSaga