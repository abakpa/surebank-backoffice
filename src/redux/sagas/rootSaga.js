import {all} from 'redux-saga/effects'
import branchSaga from './branchSaga'
import staffSaga from './staffSaga'
import customerSaga from './customerSaga'
import loginSaga from './loginSaga'
import depositSaga from './depositSaga'
import withdrawalSaga from './withdrawalSaga'
import customerAccountSaga from './createAccountSaga'
import subAccountSaga from './subAccountSaga'
import customerAccountDetailSaga from './customerAccountDetailSaga'
import dashboardSaga from './dashboardSaga'
import expenditureSaga from './expenditureSaga'
import expenditureReportSaga from './expenditureReportSaga'
import sbincomeSaga from './sbincomeSaga'
import dsincomeSaga from './dsincomeSaga'
import transactionSaga from './transactionSaga'

export default function* rootSaga(){
    yield all([
        branchSaga(),
        staffSaga(),
        customerSaga(),
        loginSaga(),
        depositSaga(),
        customerAccountSaga(),
        customerAccountDetailSaga(),
        subAccountSaga(),
        withdrawalSaga(),
        dashboardSaga(),
        expenditureSaga(),
        sbincomeSaga(),
        dsincomeSaga(),
        expenditureReportSaga(),
        transactionSaga(),
    ])
}