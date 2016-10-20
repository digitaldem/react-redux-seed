import { isEmpty } from 'lodash';
import { ActionTypes } from '../constants/actiontypes';


export function loadExamples() {
  console.debug('loadExamples');
  return (dispatch, getState) => {
    const state = getState();

    // Already loaded, resolve promise
    if (!isEmpty(state.examples.results)) {
      return Promise.resolve(true);
    }

    // Dispatch API call
    return dispatch({
      [ActionTypes.CALL_API]: {
        types: [
          ActionTypes.REQUEST_LOAD_EXAMPLES,
          ActionTypes.RECEIVE_LOAD_EXAMPLES_SUCCESS,
          ActionTypes.RECEIVE_LOAD_EXAMPLES_ERROR],
        endpoint: 'examples.json'
      }
    });
  };
}
