import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDSContributionRequest,
    fetchDSContributionSuccess,
    fetchDSContributionFailure,
    fetchSBContributionRequest,
    fetchSBContributionSuccess,
    fetchSBContributionFailure,
    fetchFDContributionRequest,
    fetchFDContributionSuccess,
    fetchFDContributionFailure,
    fetchFDInterestIncomeRequest,
    fetchFDInterestIncomeSuccess,
    fetchFDInterestIncomeFailure,
    fetchFDInterestExpenseRequest,
    fetchFDInterestExpenseSuccess,
    fetchFDInterestExpenseFailure,
    fetcTotalSBandDSRequest,
    fetcTotalSBandDSSuccess,
    fetcTotalSBandDSFailure,
    fetchDSDailyContributionRequest,
    fetchDSDailyContributionSuccess,
    fetchDSDailyContributionFailure,
    fetchFDDailyContributionRequest,
    fetchFDDailyContributionSuccess,
    fetchFDDailyContributionFailure,
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
    fetchFDpackageRequest,
    fetchFDpackageSuccess,
    fetchFDpackageFailure,
    fetchPackageRequest,
    fetchPackageSuccess,
    fetchPackageFailure,
    fetchDSincomeRequest,
    fetchDSincomeSuccess,
    fetchDSincomeFailure,
    fetchSBincomeRequest,
    fetchSBincomeSuccess,
    fetchSBincomeFailure,
    fetchFDincomeRequest,
    fetchFDincomeSuccess,
    fetchFDincomeFailure,
    fetchTotalincomeRequest,
    fetchTotalincomeSuccess,
    fetchTotalincomeFailure,
    fetchTotalExpenditureRequest,
    fetchTotalExpenditureSuccess,
    fetchTotalExpenditureFailure,
    fetchTotalProfitRequest,
    fetchTotalProfitSuccess,
    fetchTotalProfitFailure,
  
} from '../slices/dashboardSlice'
import { url } from './url'

function* fetchDSContributionSaga(action) {
    const { details = null } = action.payload; 
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details ? details : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/ds`, requestData,config);

        yield put(fetchDSContributionSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchDSContributionFailure(error.dsresponse?.data?.message || "An error occurred"));
    }
}
function* fetchSBContributionSaga(action) {
    const { details1 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details1 ? details1 : {};
        const sbresponse = yield call(axios.post, `${url}/api/admindashboard/sb`, requestData,config);
        yield put(fetchSBContributionSuccess(sbresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchSBContributionFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchFDContributionSaga(action) {
    const { details15 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details15 ? details15 : {};
        const fdresponse = yield call(axios.post, `${url}/api/admindashboard/fd`, requestData,config);
        yield put(fetchFDContributionSuccess(fdresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDContributionFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchFDInterestIncomeSaga(action) {
    const { details17 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details17 ? details17 : {};
        const fdresponse = yield call(axios.post, `${url}/api/admindashboard/fdinterestincome`, requestData,config);
        yield put(fetchFDInterestIncomeSuccess(fdresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDInterestIncomeFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchFDInterestExpenseSaga(action) {
    const { details18 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details18 ? details18 : {};
        const fdresponse = yield call(axios.post, `${url}/api/admindashboard/fdinterestexpense`, requestData,config);
        yield put(fetchFDInterestExpenseSuccess(fdresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDInterestExpenseFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetcTotalSBandDSSaga(action) {
    const { details2 = null } = action.payload; 

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details2 ? details2 : {};
        const sbresponse = yield call(axios.post, `${url}/api/admindashboard/totalsbandds`, requestData,config);
        yield put(fetcTotalSBandDSSuccess(sbresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetcTotalSBandDSFailure(error.sbresponse?.data?.message || "An error occurred"));
    }
}
function* fetchDSDailyContributionSaga(action) {
    const { details3 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details3 ? details3 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailyds`, requestData,config);
        yield put(fetchDSDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchDSDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchFDDailyContributionSaga(action) {
    const { details19 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details19 ? details19 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailyfd`, requestData,config);
        yield put(fetchFDDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBDailyContributionSaga(action) {
    const { details4 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details4 ? details4 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailysb`, requestData,config);
        yield put(fetchSBDailyContributionSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchSBDailyContributionFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalSBandDSDailySaga(action) {
    const { details5 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details5 ? details5 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/totaldailysbandds`, requestData,config);
        yield put(fetchTotalSBandDSDailySuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchTotalSBandDSDailyFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSWithdrawalSaga(action) {
    const { details6 = null } = action.payload;
    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details6 ? details6 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dailydswithdrawal`, requestData,config);
        yield put(fetchDSWithdrawalSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchDSWithdrawalFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSpackageSaga(action) {
    const { details7 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details7 ? details7 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dspackage`, requestData,config);
        yield put(fetchDSpackageSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchDSpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBpackageSaga(action) {
    const { details8 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details8 ? details8 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/sbpackage`, requestData,config);
        yield put(fetchSBpackageSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchSBpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchFDpackageSaga(action) {
    const { details16 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details16 ? details16 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/fdpackage`, requestData,config);
        yield put(fetchFDpackageSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDpackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchPackageSaga(action) {
    const { details9 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details9 ? details9 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/packages`, requestData,config);
        yield put(fetchPackageSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchPackageFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchDSincomeSaga(action) {
    const { details10 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details10 ? details10 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/dsincome`, requestData,config);
        yield put(fetchDSincomeSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchDSincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchSBincomeSaga(action) {
    const { details11 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details11 ? details11 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/sbincome`, requestData,config);
        yield put(fetchSBincomeSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchSBincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchFDincomeSaga(action) {
    const { details20 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details20 ? details20 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/fdincome`, requestData,config);
        yield put(fetchFDincomeSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchFDincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalincomeSaga(action) {
    const { details12 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details12 ? details12 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/totalincome`, requestData,config);
        yield put(fetchTotalincomeSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchTotalincomeFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalExpenditureSaga(action) {
    const { details13 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details13 ? details13 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/totalexpenditure`, requestData,config);
        yield put(fetchTotalExpenditureSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchTotalExpenditureFailure(error.response?.data?.message || "An error occurred"));
    }
}
function* fetchTotalProfitSaga(action) {
    const { details14 = null } = action.payload;

    try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const requestData = details14 ? details14 : {};
        const dsresponse = yield call(axios.post, `${url}/api/admindashboard/profit`, requestData,config);
        yield put(fetchTotalProfitSuccess(dsresponse.data));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchTotalProfitFailure(error.response?.data?.message || "An error occurred"));
    }
}




function* depositSaga(){

    yield takeLatest(fetchDSContributionRequest.type, fetchDSContributionSaga)
    yield takeLatest(fetchSBContributionRequest.type, fetchSBContributionSaga)
    yield takeLatest(fetchFDContributionRequest.type, fetchFDContributionSaga)
    yield takeLatest(fetchFDInterestIncomeRequest.type, fetchFDInterestIncomeSaga)
    yield takeLatest(fetchFDInterestExpenseRequest.type, fetchFDInterestExpenseSaga)
    yield takeLatest(fetcTotalSBandDSRequest.type, fetcTotalSBandDSSaga)
    yield takeLatest(fetchDSDailyContributionRequest.type, fetchDSDailyContributionSaga)
    yield takeLatest(fetchFDDailyContributionRequest.type, fetchFDDailyContributionSaga)
    yield takeLatest(fetchSBDailyContributionRequest.type, fetchSBDailyContributionSaga)
    yield takeLatest(fetchTotalSBandDSDailyRequest.type, fetchTotalSBandDSDailySaga)
    yield takeLatest(fetchDSWithdrawalRequest.type, fetchDSWithdrawalSaga)
    yield takeLatest(fetchDSpackageRequest.type, fetchDSpackageSaga)
    yield takeLatest(fetchSBpackageRequest.type, fetchSBpackageSaga)
    yield takeLatest(fetchFDpackageRequest.type, fetchFDpackageSaga)
    yield takeLatest(fetchPackageRequest.type, fetchPackageSaga)
    yield takeLatest(fetchDSincomeRequest.type, fetchDSincomeSaga)
    yield takeLatest(fetchSBincomeRequest.type, fetchSBincomeSaga)
    yield takeLatest(fetchFDincomeRequest.type, fetchFDincomeSaga)
    yield takeLatest(fetchTotalincomeRequest.type, fetchTotalincomeSaga)
    yield takeLatest(fetchTotalExpenditureRequest.type, fetchTotalExpenditureSaga)
    yield takeLatest(fetchTotalProfitRequest.type, fetchTotalProfitSaga)

}

export default depositSaga