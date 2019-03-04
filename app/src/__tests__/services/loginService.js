import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as loginActions from '../../actions/loginActions'
import * as itemActions from '../../actions/itemActions'
import * as orderActions from '../../actions/orderActions'
import loginService from '../../services/loginService'
import config from '../../services/config';
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk])

describe('Login', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  it('creates RECEIVE_USER when fetching user has been done', () => {
    fetchMock.postOnce(config.apiUrl+'/getUser', {
      body: { 
        user: {
          username:'johns', 
          firstName: 'John',
          lastName: 'Smith'
        } 
      },
      headers: { 'Content-Type': 'application/json' }
    });

    fetchMock.postOnce(config.apiUrl+'/getItems', {
      body:{ },
      headers: { 'Content-Type': 'application/json' }
    });

    fetchMock.postOnce(config.apiUrl+'/getOrders', {
      body: {},
      headers: { 'Content-Type': 'application/json' }
    });

    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      { type: loginActions.RECEIVE_USER, payload: { 
          user: {
            username:'johns', 
            firstName: 'John',
            lastName: 'Smith'
          } 
        } 
      },
      { type: itemActions.REQUEST_ITEMS },
      { type: orderActions.REQUEST_ORDERS },
    ]
    const store = mockStore({})

    const user = {username: 'johns', password: 'pass'};
    return store.dispatch(loginService.fetchUser(user,{})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle when the username or the password is invalid', () => { 
    fetchMock.postOnce(config.apiUrl+'/getUser', {
      body: { },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      { type: loginActions.RECEIVE_USER, payload: {}},
    ]
    const store = mockStore({})
    const user = {username: 'johns', password: 'pass'};
    return store.dispatch(loginService.fetchUser(user,{})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error when there is an error in fetching', () => { 
    fetchMock.postOnce(config.apiUrl+'/getUser', {throws: 'Error occurred'})
    const expectedActions = [
      { type: loginActions.REQUEST_USER },
      { type: loginActions.RECEIVE_USER, payload: undefined},
    ]
    const store = mockStore({})
    const user = {username: 'johns', password: 'pass'};
    return store.dispatch(loginService.fetchUser(user,{})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should remove the data stored in the local storage when logout', () => {
    const storageRemoveSpy = jest.spyOn(Storage.prototype, 'removeItem');
    const history = {
      push: jest.fn()
    }
    const store = mockStore({})
    store.dispatch(loginService.logout(history))
    expect(storageRemoveSpy).toHaveBeenCalledTimes(3);
    expect(storageRemoveSpy).toBeCalledWith('user');
    expect(storageRemoveSpy).toBeCalledWith('orders');
    expect(storageRemoveSpy).toBeCalledWith('items');
  });
})