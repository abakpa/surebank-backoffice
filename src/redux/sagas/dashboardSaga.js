import {call, put,all, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDSContributionRequest,
    fetchDSContributionSuccess,
    fetchDSContributionFailure,
 
  
} from '../slices/dashboardSlice'
import { url } from './url'

  
function* fetchDSContributionSaga() {
  try {
    // Fetch all required data in parallel
    const [dscontribution,
        sbcontribution,
        totalsbandds,
        dailyds,
        dailysb,
        totaldailysbandds,
        dswithdrawal,
        dspackage,
        sbpackage,
        packages,
        dsincome
     ] = yield all([
      call(axios.get, `${url}/api/admindashboard/ds`),
      call(axios.get, `${url}/api/admindashboard/sb`),
      call(axios.get, `${url}/api/admindashboard/totalsbandds`),
      call(axios.get, `${url}/api/admindashboard/dailyds`),
      call(axios.get, `${url}/api/admindashboard/dailysb`),
      call(axios.get, `${url}/api/admindashboard/totaldailysbandds`),
      call(axios.get, `${url}/api/admindashboard/dswithdrawal`),
      call(axios.get, `${url}/api/admindashboard/dspackage`),
      call(axios.get, `${url}/api/admindashboard/sbpackage`),
      call(axios.get, `${url}/api/admindashboard/packages`),
      call(axios.get, `${url}/api/admindashboard/dsincome`),
 
    ]);
    // Combine dsAccountResponse and sbAccountResponse into one object
    const dashboard = {
      dscontribution: dscontribution.data,
      sbcontribution: sbcontribution.data,
      totalsbandds: totalsbandds.data,
      dailyds:dailyds.data,
      dailysb:dailysb.data,
      totaldailysbandds:totaldailysbandds.data,
      dswithdrawal:dswithdrawal.data,
      dspackage:dspackage.data,
      sbpackage:sbpackage.data,
      packages:packages.data,
      dsincome:dsincome.data,
  
    };

    // Dispatch success action with all fetched data
    yield put(
        fetchDSContributionSuccess({
        dashboard, // Combined object
      })
    );

  } catch (error) {
    console.error("Customer Account Fetch Error:", error.message);
    yield put(fetchDSContributionFailure(error.message));
  }
}

function* depositSaga(){

    yield takeLatest(fetchDSContributionRequest.type, fetchDSContributionSaga)

}

export default depositSaga