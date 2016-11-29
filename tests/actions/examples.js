import expect from 'expect';
import fetchMock from 'fetch-mock';
import { __API_URL__ } from '../../app/constants';
import { ActionTypes } from '../../app/constants/actiontypes';
import { loadExamples } from '../../app/actions/examples';
import mockStore from '../../mocks/store';
import examples from '../../mocks/examples.json';
import error from '../../mocks/error.json';


describe('actions.examples', () => {
  describe('LOAD_EXAMPLES', function() {
    afterEach(() => {
      fetchMock.restore();
    });

    const initialState = { examples: { isLoading: false, results: [] } }

    it('creates RECEIVE_LOAD_EXAMPLES_SUCCESS when loadExamples fetch returns HTTP_200.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_LOAD_EXAMPLES},
        {type: ActionTypes.RECEIVE_LOAD_EXAMPLES_SUCCESS}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}examples.json`, { status: 200, body: examples });

      store.dispatch(loadExamples())
        .then((r) => {
          expect(r.response.results.length).toBeGreaterThan(0);
          expect(r.response.results.length).toEqual(r.response.totalCount);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_LOAD_EXAMPLES_ERROR when loadExamples fetch returns HTTP_500.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_LOAD_EXAMPLES},
        {type: ActionTypes.RECEIVE_LOAD_EXAMPLES_ERROR}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}examples.json`, { status: 500, body: error });

      store.dispatch(loadExamples())
        .then((r) => {
          expect(r.response.totalCount).toEqual(0);
        }).then(x => done()).catch(x => done(x));
    });

    it('resolves when examples have already been loaded.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_LOAD_EXAMPLES}
      ];
      const store = mockStore(expectedActionChain, { examples: { results: examples.results } });

      store.dispatch(loadExamples())
        .then((r) => {
          expect(r).toBe(true);
        }).then(x => done()).catch(x => done(x));
    });

  });
});
