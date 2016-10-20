import createLogger from 'redux-logger';
import { __DEBUG__ } from '../constants';


// Create a Redux Logger in debug mode, otherwise just return a pass-through
export default (!__DEBUG__)
  ? createLogger({ level: 'info', collapsed: true })
  : store => next => action => next(action);
