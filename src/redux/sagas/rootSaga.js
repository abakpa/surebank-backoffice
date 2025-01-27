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

export default function* rootSaga(){
    yield all([branchSaga(),staffSaga(),customerSaga(),loginSaga(),depositSaga(),customerAccountSaga(),customerAccountDetailSaga(),subAccountSaga(),withdrawalSaga()])
}