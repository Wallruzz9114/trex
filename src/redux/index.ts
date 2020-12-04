import { combineReducers } from 'redux';
import userReducer from './refucers/userReducer';

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;
