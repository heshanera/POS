import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as loginActions from '../../actions/loginActions';
import * as itemActions from '../../actions/itemActions';
import * as errorActions from '../../actions/errorActions';
import * as orderActions from '../../actions/orderActions';
import loginService from '../../services/loginService';
import config from '../../services/config';

const mockStore = configureMockStore([thunk]);

describe('Login', () => {
  beforeAll(() => {
    const localStorageUserData = JSON.stringify({ username: 'johns' });
    Storage.prototype.getItem = jest.fn((data) => {
      if (data === 'user') return localStorageUserData;
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  afterAll(() => {
    Storage.prototype.getItem.mockRestore();
  });

  it('creates RECEIVE_USER when fetching user has been done', () => {
    fetchMock.postOnce(`${config.apiUrl}/getUser`, {
      body: {
        username: 'johns',
        firstName: 'John',
        lastName: 'Smith',
      },
      headers: { 'Content-Type': 'application/json' },
    });

    fetchMock.getOnce(`${config.apiUrl}/getItems`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
    });

    fetchMock.getOnce(`${config.apiUrl}/getOrders/johns`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
    });

    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      {
        type: loginActions.RECEIVE_USER,
        payload: {
          username: 'johns',
          firstName: 'John',
          lastName: 'Smith',
        },
      },
      { type: itemActions.REQUEST_ITEMS },
      { type: orderActions.REQUEST_ORDERS },
    ];
    const store = mockStore({});

    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.fetchUser(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle when the username or the password is invalid', () => {
    fetchMock.postOnce(`${config.apiUrl}/getUser`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });

    jest.useFakeTimers();
    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      {
        type: errorActions.RECEIVE_ERROR,
        payload: { error: '400', message: 'invalid username or password', show: true },
      },
    ];
    const updatedExpectedActions = [
      { type: loginActions.REQUEST_USER },
      {
        type: errorActions.RECEIVE_ERROR,
        payload: { error: '400', message: 'invalid username or password', show: true },
      },
      { type: errorActions.RESET_ERROR, payload: { error: '', message: '', show: false } },
    ];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.fetchUser(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions);
    });
  });

  it('handle when response in empty', () => {
    fetchMock.postOnce(`${config.apiUrl}/getUser`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
    });
    const expectedActions = [{ type: loginActions.REQUEST_USER }];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.fetchUser(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle error when there is an error in fetching', () => {
    fetchMock.postOnce(`${config.apiUrl}/getUser`, { throws: 'Error occurred' });
    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      {
        type: errorActions.RECEIVE_ERROR,
        payload: {
          error: 'Error occurred',
          message: 'invalid username or password',
          show: true,
        },
      },
    ];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.fetchUser(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should throw errors when the data is invalid when registering new users', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {
        username: 'johns',
        firstName: 'John',
        lastName: 'Smith',
      },
      headers: { 'Content-Type': 'application/json' },
    });

    fetchMock.postOnce(`${config.apiUrl}/createOrder`, {
      body: {
        userName: 'johns',
        orderList: [],
      },
      headers: { 'Content-Type': 'application/json' },
    });
    const expectedActions = [];
    const store = mockStore({});
    const user = {
      username: 'johns',
      firstName: 'John',
      lastName: 'Smith',
    };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle error when there is an error in adding the new user', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, { throws: 'Error occurred' });
    const expectedActions = [
      {
        type: errorActions.RECEIVE_ERROR,
        payload: {
          error: 'Error occurred',
          message: 'error occoured',
          show: true,
        },
      },
    ];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should throw errors when the response is empty', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
    });
    const expectedActions = [
      { type: errorActions.RECEIVE_ERROR, payload: { error: 'error occoured', message: 'error occoured', show: true } },
    ];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle error when there is an error when creating order list', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {
        username: 'johns',
        firstName: 'John',
        lastName: 'Smith',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMock.postOnce(`${config.apiUrl}/createOrder`, { throws: 'Error occurred' });
    const expectedActions = [];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle error when the received order list is null', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {
        username: 'johns',
        firstName: 'John',
        lastName: 'Smith',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMock.postOnce(`${config.apiUrl}/createOrder`, {});
    const expectedActions = [];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle when the user details are invalid', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
    const expectedActions = [
      { type: errorActions.RECEIVE_ERROR, payload: { error: '400', message: 'error occoured', show: true } },
    ];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handle when the order details are invalid', () => {
    fetchMock.postOnce(`${config.apiUrl}/addUser`, {
      body: {
        username: 'johns',
        firstName: 'John',
        lastName: 'Smith',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMock.postOnce(`${config.apiUrl}/createOrder`, {
      body: {},
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
    const expectedActions = [];
    const store = mockStore({});
    const user = { username: 'johns', password: 'pass' };
    return store.dispatch(loginService.register(user, {})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
    });
  });

  it('should remove the data stored in the local storage when logout', () => {
    const storageRemoveSpy = jest.spyOn(Storage.prototype, 'removeItem');
    const history = {
      push: jest.fn(),
    };
    const store = mockStore({});
    store.dispatch(loginService.logout(history));
    expect(storageRemoveSpy).toHaveBeenCalledTimes(3);
    expect(storageRemoveSpy).toBeCalledWith('user');
    expect(storageRemoveSpy).toBeCalledWith('orders');
    expect(storageRemoveSpy).toBeCalledWith('items');
  });
});
