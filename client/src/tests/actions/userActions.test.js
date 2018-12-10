import moxios from 'moxios';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import { loginUser, registerUser, logoutUser } from '../../actions/userActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImVtcGVyb2Fya2F5In0sImlhdCI6MTUzNjU4NTM5MCwiZXhwIjoxNTM2NjcxNzkwLCJpc3MiOiJtb3JlX3JlY2lwZXMxNyIsImp0aSI6Im1vcmVfcmVjaXBlcyJ9.zTXtCTFsbhJ1apwiQobqEsfGQj-XrgAFRSWOzjHwAvM';

describe('User Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('logoutUser', () => {
    it('creates LOGOUT_USER', () => {
      const expectedActions = [
        {
          type: types.LOGOUT_USER
        }
      ];

      const store = mockStore({});

      store.dispatch(logoutUser());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('loginUser', () => {
    it('creates MAKING_API_REQUEST and LOGIN_USER_SUCCESS', async (done) => {
      await moxios.stubRequest('/api/v1/login', {
        status: 200,
        response: {
          message: 'success',
          token
        }
      });

      const expectedActions = [
        {
          type: types.MAKING_API_REQUEST,
          pending: true
        },
        {
          type: types.LOGIN_USER_SUCCESS,
          user: decode(token).user
        },
        {
          type: types.MAKING_API_REQUEST,
          pending: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(loginUser({ username: 'admin', password: 'godmode' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('creates MAKING_API_REQUEST and LOGIN_USER_FAILURE', async (done) => {
      await moxios.stubRequest('/api/v1/login', {
        status: 500,
        response: {
          message: 'error'
        }
      });

      const expectedActions = [
        {
          type: types.MAKING_API_REQUEST,
          pending: true
        },
        {
          type: types.LOGIN_USER_FAILURE,
          error: { message: 'error' }
        },
        {
          type: types.MAKING_API_REQUEST,
          pending: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(loginUser({}));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('registerUser', () => {
    it('creates MAKING_API_REQUEST and REGISTER_USER_SUCCESS', async (done) => {
      await moxios.stubRequest('/api/v1/register', {
        status: 201,
        response: {
          message: 'success',
          token
        }
      });

      const expectedActions = [
        {
          type: types.MAKING_API_REQUEST,
          pending: true
        },
        {
          type: types.REGISTER_USER_SUCCESS,
          user: decode(token).user
        },
        {
          type: types.MAKING_API_REQUEST,
          pending: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(registerUser({}));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('creates MAKING_API_REQUEST and REGISTER_USER_FAILURE', async (done) => {
      await moxios.stubRequest('/api/v1/register', {
        status: 500,
        response: {
          message: 'error'
        }
      });

      const expectedActions = [
        {
          type: types.MAKING_API_REQUEST,
          pending: true
        },
        {
          type: types.REGISTER_USER_FAILURE,
          error: { message: 'error' }
        },
        {
          type: types.MAKING_API_REQUEST,
          pending: false
        }
      ];

      const store = mockStore({});

      await store.dispatch(registerUser({}));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
