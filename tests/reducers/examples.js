import expect from 'expect';
import { ActionTypes } from '../../app/constants/actiontypes';
import reducers from '../../app/reducers';
import reducer from '../../app/reducers/examples';
import examples from '../../mocks/examples.json';


describe('reducers.examples', () => {
  it('should return the initial state.', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isLoading: false,
        results: []});
  });

  describe('LOAD_EXAMPLES', function() {
    it('should handle REQUEST_LOAD_EXAMPLES.', () => {
      expect(reducer({}, { type: ActionTypes.REQUEST_LOAD_EXAMPLES }))
        .toEqual({
          isLoading: true});
    });

    it('should handle RECEIVE_LOAD_EXAMPLES_SUCCESS.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_LOAD_EXAMPLES_SUCCESS, response: examples }))
        .toEqual({
          isLoading: false,
          results: examples.results});
    });

    it('should handle RECEIVE_LOAD_EXAMPLES_ERROR.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_LOAD_EXAMPLES_ERROR }))
        .toEqual({
          isLoading: false,
          results: []
        });
    });

  });

});
