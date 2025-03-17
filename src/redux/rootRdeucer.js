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
    dashboard:admindashboard
});

export default rootReducer;