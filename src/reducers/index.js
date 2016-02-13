import { combineReducers } from 'redux';
import blankReducer from './blank-reducer';

const rootReducer = combineReducers({
    list: blankReducer
});

export default rootReducer;
