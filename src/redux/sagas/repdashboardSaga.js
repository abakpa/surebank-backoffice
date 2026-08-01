import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchRepDSDailyContributionRequest,
    fetchRepDSDailyContributionSuccess,
    fetchRepDSDailyContributionFailure,
    fetchRepSBDailyContributionRequest,
    fetchRepSBDailyContributionSuccess,
    fetchRepSBDailyContributionFailure,
    fetchRepFDDailyContributionRequest,
    fetchRepFDDailyContributionSuccess,
    fetchRepFDDailyContributionFailure,
    fetchRepTotalSBandDSDailyRequest,
    fetchRepTotalSBandDSDailySuccess,
    fetchRepTotalSBandDSDailyFailure,
    fetchRepDSWithdrawalRequest,
    fetchRepDSWithdrawalSuccess,
    fetchRepDSWithdrawalFailure,
    fetchRepFWWithdrawalRequest,
    fetchRepFWWithdrawalSuccess,
    fetchRepFWWithdrawalFailure,
    fetchRepFWWithdrawalReportRequest,
    fetchRepFWWithdrawalReportSuccess,
    fetchRepFWWithdrawalReportFailure,
    fetchRepDSpackageRequest,
    fetchRepDSpackageSuccess,
    fetchRepDSpackageFailure,
    fetchRepSBpackageRequest,
    fetchRepSBpackageSuccess,
    fetchRepSBpackageFailure,
    fetchRepFDpackageRequest,
    fetchRepFDpackageSuccess,
    fetchRepFDpackageFailure,
    fetchRepPackageRequest,
    fetchRepPackageSuccess,
    fetchRepPackageFailure,
    fetchRepTotalExpenditureRequest,
    fetchRepTotalExpenditureSuccess,
    fetchRepTotalExpenditureFailure,
        fetchReferralRequest,
    fetchReferralSuccess,
    fetchReferralFailure,
    fetchRepEcommerceDepositRequest,
    fetchRepEcommerceDepositSuccess,
    fetchRepEcommerceDepositFailure,
    fetchRepEcommerceDepositReportRequest,
    fetchRepEcommerceDepositReportSuccess,
    fetchRepEcommerceDepositReportFailure,
    fetchRepEcommerceDSDepositRequest,
    fetchRepEcommerceDSDepositSuccess,
    fetchRepEcommerceDSDepositFailure,
    fetchRepEcommerceDSDepositReportRequest,
    fetchRepEcommerceDSDepositReportSuccess,
    fetchRepEcommerceDSDepositReportFailure,
  
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchReFDDailyContributionSaga(action) {
    const { details16 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details16 ? details16 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/dailyrepfd`, requestData,config);
        yield put(fetchRepFDDailyContributionSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepFDDailyContributionFailure(error.response?.data?.message || "An error occurred"));
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepFWWithdrawalSaga(action) {
    const { details20 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details20 ? details20 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repfwwithdrawal`, requestData,config);
        yield put(fetchRepFWWithdrawalSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepFWWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepFWWithdrawalReportSaga(action) {
    const { details21 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details21 ? details21 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repfwwithdrawalreport`, requestData,config);
        yield put(fetchRepFWWithdrawalReportSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepFWWithdrawalReportFailure(error.response?.data?.message || "An error occurred"));
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchRepFDpackageSaga(action) {
    const { details15 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details15 ? details15 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/repfdpackage`, requestData,config);
        yield put(fetchRepFDpackageSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepFDpackageFailure(error.response?.data?.message || "An error occurred"));
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
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
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchRepTotalExpenditureSaga(action) {
    const { details13 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details13 ? details13 : {};
        const dsresponse = yield call(axios.post, `${url}/api/repdashboard/reptotalexpenditure`, requestData,config);
        yield put(fetchRepTotalExpenditureSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepTotalExpenditureFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchrerralSaga(action){
     const { details17 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
         const requestData = details17 ? details17 : {};
        const response = yield call(axios.post, `${url}/api/mvrepdashboard/referral/${details17.staffId}`, requestData,config)
        yield put(fetchReferralSuccess(response.data))
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchReferralFailure(error.response.data.message))
    }
}

function* fetchRepEcommerceDepositSaga(action) {
    const { details18 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details18 ? details18 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repecommercedeposit`, requestData, config);
        yield put(fetchRepEcommerceDepositSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepEcommerceDepositFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchRepEcommerceDepositReportSaga(action) {
    const { details19 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details19 ? details19 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repecommercedepositreport`, requestData, config);
        yield put(fetchRepEcommerceDepositReportSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepEcommerceDepositReportFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchRepEcommerceDSDepositSaga(action) {
    const { details22 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details22 ? details22 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repecommercedsdeposit`, requestData, config);
        yield put(fetchRepEcommerceDSDepositSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepEcommerceDSDepositFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchRepEcommerceDSDepositReportSaga(action) {
    const { details23 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details23 ? details23 : {};
        const response = yield call(axios.post, `${url}/api/repdashboard/repecommercedsdepositreport`, requestData, config);
        yield put(fetchRepEcommerceDSDepositReportSuccess(response.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchRepEcommerceDSDepositReportFailure(error.response?.data?.message || "An error occurred"));
    }
}


function* depositSaga(){

   
    yield takeLatest(fetchRepDSDailyContributionRequest.type, fetchRepDSDailyContributionSaga)
    yield takeLatest(fetchRepSBDailyContributionRequest.type, fetchRepSBDailyContributionSaga)
    yield takeLatest(fetchRepFDDailyContributionRequest.type, fetchReFDDailyContributionSaga)
    yield takeLatest(fetchRepTotalSBandDSDailyRequest.type, fetchRepTotalSBandDSDailySaga)
    yield takeLatest(fetchRepDSWithdrawalRequest.type, fetchRepDSWithdrawalSaga)
    yield takeLatest(fetchRepFWWithdrawalRequest.type, fetchRepFWWithdrawalSaga)
    yield takeLatest(fetchRepFWWithdrawalReportRequest.type, fetchRepFWWithdrawalReportSaga)
    yield takeLatest(fetchRepDSpackageRequest.type, fetchRepDSpackageSaga)
    yield takeLatest(fetchRepSBpackageRequest.type, fetchRepSBpackageSaga)
    yield takeLatest(fetchRepFDpackageRequest.type, fetchRepFDpackageSaga)
    yield takeLatest(fetchRepPackageRequest.type, fetchRepPackageSaga)
    yield takeLatest(fetchRepTotalExpenditureRequest.type, fetchRepTotalExpenditureSaga)
    yield takeLatest(fetchReferralRequest.type, fetchrerralSaga)
    yield takeLatest(fetchRepEcommerceDepositRequest.type, fetchRepEcommerceDepositSaga)
    yield takeLatest(fetchRepEcommerceDepositReportRequest.type, fetchRepEcommerceDepositReportSaga)
    yield takeLatest(fetchRepEcommerceDSDepositRequest.type, fetchRepEcommerceDSDepositSaga)
    yield takeLatest(fetchRepEcommerceDSDepositReportRequest.type, fetchRepEcommerceDSDepositReportSaga)
    

}

export default depositSaga
