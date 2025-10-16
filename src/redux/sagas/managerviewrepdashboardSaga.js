import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchMVRepDSDailyContributionRequest,
    fetchMVRepDSDailyContributionSuccess,
    fetchMVRepDSDailyContributionFailure,
    fetchBranchStaffRequest,
    fetchBranchStaffSuccess,
    fetchBranchStaffFailure,
    fetchMVRepSBDailyContributionRequest,
    fetchMVRepSBDailyContributionSuccess,
    fetchMVRepSBDailyContributionFailure,
    fetchMVRepFDDailyContributionRequest,
    fetchMVRepFDDailyContributionSuccess,
    fetchMVRepFDDailyContributionFailure,
    fetchMVRepTotalSBandDSDailyRequest,
    fetchMVRepTotalSBandDSDailySuccess,
    fetchMVRepTotalSBandDSDailyFailure,
    fetchMVRepDSWithdrawalRequest,
    fetchMVRepDSWithdrawalSuccess,
    fetchMVRepDSWithdrawalFailure,
    fetchMVRepDSpackageRequest,
    fetchMVRepDSpackageSuccess,
    fetchMVRepDSpackageFailure,
    fetchMVRepSBpackageRequest,
    fetchMVRepSBpackageSuccess,
    fetchMVRepSBpackageFailure,
    fetchMVRepFDpackageRequest,
    fetchMVRepFDpackageSuccess,
    fetchMVRepFDpackageFailure,
    fetchMVRepPackageRequest,
    fetchMVRepPackageSuccess,
    fetchMVRepPackageFailure,
    fetchMVRepTotalExpenditureRequest,
    fetchMVRepTotalExpenditureSuccess,
    fetchMVRepTotalExpenditureFailure,
    fetchMVTransactionRequest,
    fetchMVTransactionSuccess,
    fetchMVTransactionFailure,
     fetchMVReferralRequest,
    fetchMVReferralSuccess,
    fetchMVReferralFailure,
    fetchMVReferralDetailsRequest,
    fetchMVReferralDetailsSuccess,
    fetchMVReferralDetailsFailure,
  
} from '../slices/managerviewrepdashboardSlice'
import { url } from './url'


function* fetchBranchStaffSaga(action) {

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        // const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/branchstaff/${action.payload}`, {}, config);
        // console.log("branch staff",dsresponse.data.name)
        yield put(fetchBranchStaffSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchBranchStaffFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepDSDailyContributionSaga(action) {
    const { details3 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/dailyrepds/${details3.staffId}`, requestData, config);

        yield put(fetchMVRepDSDailyContributionSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepDSDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepSBDailyContributionSaga(action) {
    const { details4 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details4 ? details4 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/dailyrepsb/${details4.staffId}`, requestData,config);
        yield put(fetchMVRepSBDailyContributionSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVReFDDailyContributionSaga(action) {
    const { details16 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details16 ? details16 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/dailyrepfd/${details16.staffId}`, requestData,config);
        yield put(fetchMVRepFDDailyContributionSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepFDDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepTotalSBandDSDailySaga(action) {
    const { details5 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details5 ? details5 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/totaldailyrepcontribution/${details5.staffId}`, requestData,config);
        yield put(fetchMVRepTotalSBandDSDailySuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepTotalSBandDSDailyFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepDSWithdrawalSaga(action) {
    const { details6 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details6 ? details6 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/dailyrepdswithdrawal/${details6.staffId}`, requestData,config);
        yield put(fetchMVRepDSWithdrawalSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepDSpackageSaga(action) {
    const { details7 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details7 ? details7 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/repdspackage/${details7.staffId}`, requestData,config);
        yield put(fetchMVRepDSpackageSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepFDpackageSaga(action) {
    const { details15 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details15 ? details15 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/repfdpackage/${details15.staffId}`, requestData,config);
        yield put(fetchMVRepFDpackageSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepFDpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepSBpackageSaga(action) {
    const { details8 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details8 ? details8 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/repsbpackage/${details8.staffId}`, requestData,config);
        yield put(fetchMVRepSBpackageSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepSBpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVRepPackageSaga(action) {
    const { details9 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details9 ? details9 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/reppackages/${details9.staffId}`, requestData,config);
        yield put(fetchMVRepPackageSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}

function* fetchMVRepTotalExpenditureSaga(action) {
    const { details13 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const requestData = details13 ? details13 : {};
        const dsresponse = yield call(axios.post, `${url}/api/mvrepdashboard/reptotalexpenditure/${details13.staffId}`, requestData,config);
        yield put(fetchMVRepTotalExpenditureSuccess(dsresponse.data));
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVRepTotalExpenditureFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchMVTransactionSaga(action){
    
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post, `${url}/api/mvrepdashboard/reptransaction/${action.payload}`,{},config)
        yield put(fetchMVTransactionSuccess(response.data))
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVTransactionFailure(error.response.data.message))
    }
}
function* fetchMVReferralSaga(action){
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
        yield put(fetchMVReferralSuccess(response.data))
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVReferralFailure(error.response.data.message))
    }
}
function* fetchMVReferralDetailsSaga(action){
    //  const { details17 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        //  const requestData = details17 ? details17 : {};
        const response = yield call(axios.post, `${url}/api/mvrepdashboard/referraldetails/${action.payload}`, {},config)
        yield put(fetchMVReferralDetailsSuccess(response.data))
    } catch (error) {  if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchMVReferralDetailsFailure(error.response.data.message))
    }
}



function* depositSaga(){

   
    yield takeLatest(fetchMVRepDSDailyContributionRequest.type, fetchMVRepDSDailyContributionSaga)
    yield takeLatest(fetchBranchStaffRequest.type, fetchBranchStaffSaga)
    yield takeLatest(fetchMVRepSBDailyContributionRequest.type, fetchMVRepSBDailyContributionSaga)
    yield takeLatest(fetchMVRepFDDailyContributionRequest.type, fetchMVReFDDailyContributionSaga)
    yield takeLatest(fetchMVRepTotalSBandDSDailyRequest.type, fetchMVRepTotalSBandDSDailySaga)
    yield takeLatest(fetchMVRepDSWithdrawalRequest.type, fetchMVRepDSWithdrawalSaga)
    yield takeLatest(fetchMVRepDSpackageRequest.type, fetchMVRepDSpackageSaga)
    yield takeLatest(fetchMVRepSBpackageRequest.type, fetchMVRepSBpackageSaga)
    yield takeLatest(fetchMVRepFDpackageRequest.type, fetchMVRepFDpackageSaga)
    yield takeLatest(fetchMVRepPackageRequest.type, fetchMVRepPackageSaga)
    yield takeLatest(fetchMVTransactionRequest.type, fetchMVTransactionSaga)
    yield takeLatest(fetchMVReferralRequest.type, fetchMVReferralSaga)
    yield takeLatest(fetchMVReferralDetailsRequest.type, fetchMVReferralDetailsSaga)
    yield takeLatest(fetchMVRepTotalExpenditureRequest.type, fetchMVRepTotalExpenditureSaga)
    

}

export default depositSaga