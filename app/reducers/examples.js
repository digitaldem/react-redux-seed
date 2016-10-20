import { createReducer } from '../reducers';
import { ActionTypes } from '../constants/actiontypes';


const initialState = {
  isLoading: false,
  results: []
};

const actionHandlers = {
  [ActionTypes.REQUEST_LOAD_EXAMPLES]: (state, action) => ({
    isLoading: true
  }),

  [ActionTypes.RECEIVE_LOAD_EXAMPLES_SUCCESS]: (state, action) => ({
    isLoading: false,
    results: action.response.results
  }),

  [ActionTypes.RECEIVE_LOAD_EXAMPLES_ERROR]: (state, action) => ({
    isLoading: false,
    results: []
  })
};

export default createReducer(initialState, actionHandlers);
