import {combineReducers} from 'redux';
import branchReducer from './slices/branchSlice'
import staffReducer from './slices/staffSlice'
import customerReducer from './slices/customerSlice'
import loginReducer from './slices/loginSlice'
import depositReducer from './slices/depositSlice'
import withdrawalReducer from './slices/withdrawalSlice'
import customerAccountReducer from './slices/createAccountSlice'
import subAccountReducer from './slices/subAccountSlice'
import customerAccountDetailReducer from './slices/customerAccountDetailSlice'
import admindashboard from './slices/dashboardSlice'
import managerdashboard from './slices/managerdashboardSlice'
import repdashboard from './slices/repdashboardSlice'
import managerviewrepdashboard from './slices/managerviewrepdashboardSlice'
import expenditures from './slices/expenditureSlice'
import expendituresreport from './slices/expenditureReportSlice'
import fdreport from './slices/fdSlice'
import sbincome from './slices/sbIncomeSlice'
import dsincome from './slices/dsincomeSlice'
import fdincome from './slices/FDincomeSllice'
import transactions from './slices/transactionSlice'
import orders from './slices/orderSlice'

const rootReducer = combineReducers({
    branch:branchReducer,
    staff:staffReducer,
    customer:customerReducer,
    login:loginReducer,
    deposit:depositReducer,
    withdrawal:withdrawalReducer,
    customerAccount:customerAccountReducer,
    subAccount:subAccountReducer,
    customerAccountDetail:customerAccountDetailReducer,
    dashboard:admindashboard,
    managerdashboard:managerdashboard,
    repdashboard:repdashboard,
    mvrepdashboard:managerviewrepdashboard,
    expenditure:expenditures,
    expenditurereport:expendituresreport,
    sbincomereport:sbincome,
    dsincomereport:dsincome,
    fdincomereport:fdincome,
    transaction:transactions,
    order:orders,
    fd:fdreport
});

export default rootReducer;