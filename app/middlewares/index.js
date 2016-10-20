import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from './api';
import loggerMiddleware from './logger';
import rootReducer from '../reducers';


export function configureStore(initialState = { }) {
  return compose(applyMiddleware(thunk, apiMiddleware, loggerMiddleware))(createStore)(rootReducer, initialState);
}
