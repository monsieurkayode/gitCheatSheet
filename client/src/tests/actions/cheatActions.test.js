import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import fetchCheats, { setCopiedClipboardId } from '../../actions/cheatActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Cheat Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('fetchCheats', () => {
    it('creates MAKING_API_REQUEST, FETCH_CHEATS_SUCCESS and FETCH_CATEGORIES_SUCCESS',
      async (done) => {
        await moxios.stubRequest('/api/v1/cheats/', {
          status: 200,
          response: {
            cheatSheets: []
          }
        });

        await moxios.stubRequest('/api/v1/categories', {
          status: 200,
          response: {
            categories: []
          }
        });

        const expectedActions = [
          {
            type: types.MAKING_API_REQUEST,
            pending: true
          },
          {
            type: types.FETCH_CHEATS_SUCCESS,
            cheats: []
          },
          {
            type: types.FETCH_CATEGORIES_SUCCESS,
            categories: []
          },
          {
            type: types.MAKING_API_REQUEST,
            pending: false
          },
        ];

        const store = mockStore({});

        await store.dispatch(fetchCheats());
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

    it('creates MAKING_API_REQUEST, FETCH_CHEATS_FAILURE and FETCH_CATEGORIES_FAILURE',
      async (done) => {
        await moxios.stubRequest('/api/v1/cheats/', {
          status: 500,
          response: {}
        });

        await moxios.stubRequest('/api/v1/categories', {
          status: 500,
          response: {}
        });

        const expectedActions = [
          {
            type: types.MAKING_API_REQUEST,
            pending: true
          },
          {
            type: types.FETCH_CHEATS_FAILURE,
            error: {}
          },
          {
            type: types.FETCH_CATEGORIES_FAILURE,
            error: {}
          },
          {
            type: types.MAKING_API_REQUEST,
            pending: false
          },
        ];

        const store = mockStore({});

        await store.dispatch(fetchCheats());
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  describe('setCopiedClipboardId', () => {
    it('creates SET_COPIED_CLIPBOARD_ID ', () => {
      const expectedActions = [
        {
          type: types.SET_COPIED_CLIPBOARD_ID,
          id: '1'
        }
      ];

      const store = mockStore({});

      store.dispatch(setCopiedClipboardId('1'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
