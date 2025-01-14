import {combineReducers} from 'redux';
import branchReducer from './slices/branchSlice'
import staffReducer from './slices/staffSlice'
import customerReducer from './slices/customerSlice'
import loginReducer from './slices/loginSlice'
import depositReducer from './slices/depositSlice'
import customerAccountReducer from './slices/createAccountSlice'
import customerAccountDetailReducer from './slices/customerAccountDetailSlice'


const rootReducer = combineReducers({
    branch:branchReducer,
    staff:staffReducer,
    customer:customerReducer,
    login:loginReducer,
    deposit:depositReducer,
    customerAccount:customerAccountReducer,
    customerAccountDetail:customerAccountDetailReducer
});

export default rootReducer;