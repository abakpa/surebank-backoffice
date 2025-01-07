import {combineReducers} from 'redux';
import branchReducer from './slices/branchSlice'
import staffReducer from './slices/staffSlice'
import customerReducer from './slices/customerSlice'


const rootReducer = combineReducers({
    branch:branchReducer,
    staff:staffReducer,
    customer:customerReducer
});

export default rootReducer;