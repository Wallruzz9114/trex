import { useSelector as useReduxSelector } from 'react-redux';
import { combineReducers } from 'redux';
import userReducer from './refucers/userReducer';

const rootReducer = combineReducers({ user: userReducer });
export type IRootState = ReturnType<typeof rootReducer>;

export const useSelector = useReduxSelector;

export default rootReducer;
