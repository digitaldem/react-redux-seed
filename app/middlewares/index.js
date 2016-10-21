import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import api from './api';
import logger from './logger';
import devtools from './devtools';
import rootReducer from '../reducers';
import { __DEBUG__ } from '../constants';


export default function configureStore(initialState = { }) {
  return (__DEBUG__)
    ? compose(applyMiddleware(thunk, api, logger), devtools)(createStore)(rootReducer, initialState)
    : compose(applyMiddleware(thunk, api))(createStore)(rootReducer, initialState);
}
