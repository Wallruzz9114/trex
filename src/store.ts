import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/refucers/userReducer';

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares)];
const store = createStore(reducer, compose(...enhancers));

export default store;
