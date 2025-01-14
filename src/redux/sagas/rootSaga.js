import {all} from 'redux-saga/effects'
import branchSaga from './branchSaga'
import staffSaga from './staffSaga'
import customerSaga from './customerSaga'
import loginSaga from './loginSaga'
import depositSaga from './depositSaga'
import customerAccountSaga from './createAccountSaga'

export default function* rootSaga(){
    yield all([branchSaga(),staffSaga(),customerSaga(),loginSaga(),depositSaga(),customerAccountSaga()])
}