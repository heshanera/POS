import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as itemActions from '../../actions/itemActions'
import * as errorActions from '../../actions/errorActions'
import itemService from '../../services/itemService'
import config from '../../services/config';
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk])

describe('Login', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  afterAll(() => {
    Storage.prototype.getItem.mockRestore();
  });

  it('creates RECEIVE_ITEMS when fetching user has been done', () => {
    fetchMock.getOnce(config.apiUrl+'/getItems', {
      body: [{
        image:{},
        itemName:'itemX',
        price:1.25,
        _id:'5c7166a61dee2c23f58dce5d',
      }],
      headers: { 'Content-Type': 'application/json' }
    });

    const expectedActions = [
      { type: itemActions.REQUEST_ITEMS },
      { type: itemActions.RECEIVE_ITEMS, payload: [{
        image:{},
        itemName:'itemX',
        price:1.25,
        _id:'5c7166a61dee2c23f58dce5d',
      }]
        
      }
    ];
    const localStorageData = JSON.stringify({ 
      user:{
        username:'johns',
        token:'sajdkhsakdwqdgdhkhaskjdhwd72ewueeji',
      }
    });
    Storage.prototype.getItem = jest.fn((key) => {if (key === 'user') return localStorageData});
    const store = mockStore({})
    return store.dispatch(itemService.fetchAvailableItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle when the authentication fails', () => { 
    fetchMock.getOnce(config.apiUrl+'/getItems', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: itemActions.REQUEST_ITEMS },
    ]
    const store = mockStore({})
    return store.dispatch(itemService.fetchAvailableItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error when there is an error in fetching', () => { 
    fetchMock.getOnce(config.apiUrl+'/getItems', {
      throws: 'Error occurred',
    })
    const expectedActions = [
      { type: itemActions.REQUEST_ITEMS },
      { type: errorActions.RECEIVE_ERROR, payload: {error: "no orders received", message: "error occoured in receiving items", show: true}}
    ]
    const store = mockStore({})
    return store.dispatch(itemService.fetchAvailableItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error and display error messages', () => { 
    fetchMock.getOnce(config.apiUrl+'/getItems', {
      status: 400
    })
    jest.useFakeTimers();
    const expectedActions = [
      { type: itemActions.REQUEST_ITEMS },
      { type: errorActions.RECEIVE_ERROR, payload: {error: "400", message: "error occoured in receiving items", show: true}}
    ]
    const updatedExpectedActions = [
      { type: itemActions.REQUEST_ITEMS },
      { type: errorActions.RECEIVE_ERROR, payload: {error: '400', message: "error occoured in receiving items", show: true} },
      { type: errorActions.RESET_ERROR, payload: {error: "", message: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(itemService.fetchAvailableItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })


});