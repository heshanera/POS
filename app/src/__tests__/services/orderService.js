import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as orderActions from '../../actions/orderActions'
import * as errorActions from '../../actions/errorActions'
import orderService from '../../services/orderService'
import config from '../../services/config';
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk])

describe('Login', () => {

  let userOrders;
  let store;
  let localStorageOrderData;
  let localStorageUserData;

  beforeEach(() => {
    userOrders = {
      orderList:[
        {
          createdDate:'2018-09-01T18:30:00.000Z',
          items:[
            {
              count:2,
              name:'itemX',
              price:1.4,
              _id: '5c727a8b5af13d3c4ca23c5b'
            },
            {
              count:1,
              name:'itemY',
              price:1.7,
              _id: '5c72b76cd39fce54c62deb65'
            }
          ],
          status:'pending',
          _id: "5c668dcfa2bf5c19abf5de47"
        },
        {
          createdDate:'2018-09-02T18:38:00.000Z',
          items:[
            {
              count:1,
              name:'itemX',
              price:1.4,
              _id: '5c72b774d39fce54c62deb66'
            }
          ],
          status:'pending',
          _id: "5c668dcfa2bf5c19abf5de3d"
        }
      ],
      userName:'johns',
      _id:'5c7166a61dee2c23f58dce5d',
    }

    localStorageUserData = JSON.stringify({ 
      user:{
        username:'johns',
        token:'sajdkhsakdwqdgdhkhaskjdhwd72ewueeji',
      }
    });
    localStorageOrderData = JSON.stringify(userOrders);

    Storage.prototype.getItem = jest.fn((data) => {
      if (data === 'user') return localStorageUserData;
      else if (data === 'orders') return localStorageOrderData;
    });
    store = mockStore({})

  });

  afterEach(() => {
    fetchMock.restore(); 
  });

  afterAll(() => {
    Storage.prototype.getItem.mockRestore();
  });

  /**** Fetch Orders ****/
  it('creates RECEIVE_ORDERS when fetching user has been done', () => {

    fetchMock.getOnce(config.apiUrl+'/getOrders/johns', {
      body: userOrders,
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.RECEIVE_ORDERS, payload: userOrders}
    ];
    return store.dispatch(orderService.fetchOrders('johns',{ push:() => {} })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle when the authentication fails', () => { 
    fetchMock.getOnce(config.apiUrl+'/getOrders/johns', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ]
    return store.dispatch(orderService.fetchOrders('johns',{ push:() => {} })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })  
  })

  it('handle error when there is an error in fetching', () => { 
    fetchMock.getOnce(config.apiUrl+'/getOrders/johns', {throws: 'Error occurred'});
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "no orders received", error: "error occoured in receiving orders", show: true}}
    ]
    return store.dispatch(orderService.fetchOrders('johns',{ push:() => {} })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error and displaying error messages when fetching orders', () => { 
    fetchMock.getOnce(config.apiUrl+'/getOrders/johns', {
      status: 400
    });
    jest.useFakeTimers();
     const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "400", error: "error occoured in receiving orders", show: true}}
    ]
    const updatedExpectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: '400', error: "error occoured in receiving orders", show: true} },
      { type: errorActions.RESET_ERROR, payload: {code: "", error: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(orderService.fetchOrders('johns',{ push:() => {} })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })

  /**** Add Order ****/
  it('creates UPDATE_ORDERS when adding new order has been done', () => {

    const newOrder = {
      items:[
        {
          count:2,
          name:'itemA',
          price:1.4
        },
        {
          count:1,
          name:'itemB',
          price:1.7
        }
      ],
      status:'pending',
      username:'johns'
    }

    const newOrderResponse = {
      items:[
        {
          count:2,
          name:'itemA',
          price:1.4
        },
        {
          count:1,
          name:'itemB',
          price:1.7
        }
      ],
      status:'pending',
      createdDate:'2019-02-28T12:04:59.000Z',
      _id:'5c77ce6b3fe1e608b4f8e9e3'
    }

    fetchMock.postOnce(config.apiUrl+'/addOrder', {
      body: newOrderResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));
    newUserOrders.orderList.push(newOrderResponse);

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.UPDATE_ORDERS, payload: newUserOrders}
    ];
    
    return store.dispatch(orderService.addOrder(newOrder)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle when the authentication fails when adding a new order', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrder', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ]
    return store.dispatch(orderService.addOrder({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error when there is an error in adding a new order', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrder', {throws: 'Error occurred'})
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "Cannot read property 'success' of undefined", error: "error in adding the new order", show: true}}
    ]
    return store.dispatch(orderService.addOrder({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('handle error and displaying error messages when adding an order', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrder', {
      status: 400
    });
    jest.useFakeTimers();
     const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "400", error: "error in adding the new order", show: true}}
    ]
    const updatedExpectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: '400', error: "error in adding the new order", show: true} },
      { type: errorActions.RESET_ERROR, payload: {code: "", error: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(orderService.addOrder({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })

  /**** Remove Item ****/
  it('creates UPDATE_ORDERS when removing an item from an order has been done', () => {

    const removeItemResponse = '1';

    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {
      body: removeItemResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const orderId = '5c668dcfa2bf5c19abf5de47';
    const itemId = '5c72b76cd39fce54c62deb65';

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));
    newUserOrders.orderList[0].items = newUserOrders.orderList[0].items.filter( item => item._id !== itemId )

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.UPDATE_ORDERS, payload: newUserOrders}
    ];
    
    return store.dispatch(orderService.removeItem(orderId,itemId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates UPDATE_ORDERS when removing the last item from an order has done', () => {

    const removeItemResponse = '0';

    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {
      body: removeItemResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const orderId = '5c668dcfa2bf5c19abf5de3d';
    const itemId = '5c72b774d39fce54c62deb66';

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));
    newUserOrders.orderList.splice(1,1);

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.UPDATE_ORDERS, payload: newUserOrders}
    ];
    
    return store.dispatch(orderService.removeItem(orderId,itemId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handles when the item is not removed from the order', () => {

    const removeItemResponse = '2';

    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {
      body: removeItemResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const orderId = '5c668dcfa2bf5c19abf5de47';
    const itemId = '5c72b76cd39fce54c62deb65';

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ];
    
    return store.dispatch(orderService.removeItem(orderId,itemId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })


  });

  it('handle when the authentication fails when removing an item', () => { 
    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ]

    const orderId = '5c668dcfa2bf5c19abf5de47';
    const itemId = '5c72b76cd39fce54c62deb65';

    return store.dispatch(orderService.removeItem(orderId,itemId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('handle error when there is an error in removing an item', () => { 
    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {throws: 'Error occurred'})
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "Cannot read property 'success' of undefined", error: "error in removing the item", show: true}}
    ]
    return store.dispatch(orderService.removeItem({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle error and displaying error messages when removing items', () => { 
    fetchMock.deleteOnce(config.apiUrl+'/removeOrderItem', {
      status: 400
    });
    jest.useFakeTimers();
     const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "400", error: "error in removing the item", show: true}}
    ]
    const updatedExpectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: '400', error: "error in removing the item", show: true} },
      { type: errorActions.RESET_ERROR, payload: {code: "", error: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(orderService.removeItem({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })

  /**** Add Item ****/
  it('creates UPDATE_ORDERS when adding new item to an order has been done', () => {

    const newItem = {
      count: 1,
      itemName: 'itemD',
      orderId: '5c668dcfa2bf5c19abf5de47',
      price: 1.7,
      username: 'johns',
    }

    const newItemResponse = {
      count: 1,
      name: "itemD",
      price: 1.7,
      _id: "5c78b470ed9a74170768a976"
    };

    fetchMock.postOnce(config.apiUrl+'/addOrderItem', {
      body: newItemResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const orderId = '5c668dcfa2bf5c19abf5de47';
    const itemName = 'itemD';
    const price = 1.7;
    const count = 1;

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));
    newUserOrders.orderList[0].items.push(newItemResponse);

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.UPDATE_ORDERS, payload: newUserOrders}
    ];
    
    return store.dispatch(orderService.addItem(orderId,itemName,price,count)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle when the authentication fails when adding an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrderItem', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ]
    return store.dispatch(orderService.addItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('handle error when there is an error in adding an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrderItem', {throws: 'Error occurred'})
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "Cannot read property 'success' of undefined", error: "error in adding the item", show: true}}
    ]
    return store.dispatch(orderService.addItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle error and displaying error messages when adding an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/addOrderItem', {
      status: 400
    });
    jest.useFakeTimers();
     const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "400", error: "error in adding the item", show: true}}
    ]
    const updatedExpectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: '400', error: "error in adding the item", show: true} },
      { type: errorActions.RESET_ERROR, payload: {code: "", error: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(orderService.addItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })

  /**** Update Item ****/
  it('creates UPDATE_ORDERS when updating the item count has done', () => {

    const itemCountResponse = {
      count: 4,
      name: "itemY",
      price: 1.7,
      _id: "5c72b76cd39fce54c62deb65"
    };

    fetchMock.postOnce(config.apiUrl+'/updateOrderItem', {
      body: itemCountResponse,
      headers: { 'Content-Type': 'application/json' }
    });

    const orderId = '5c668dcfa2bf5c19abf5de47';
    const itemName = 'itemY';
    const price = 1.7;
    const count = 4;

    const newUserOrders = JSON.parse(JSON.stringify(userOrders));
    newUserOrders.orderList[0].items[1] = itemCountResponse;

    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: orderActions.UPDATE_ORDERS, payload: newUserOrders}
    ];
    
    return store.dispatch(orderService.updateItem(orderId,itemName,price,count)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle when the authentication fails when updating an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/updateOrderItem', {
      body: { 
        success: false
      },
      headers: { 'Content-Type': 'application/json' }
    });
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
    ]
    return store.dispatch(orderService.updateItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('handle error when there is an error in updating an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/updateOrderItem', {throws: 'Error occurred'})
    const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "Cannot read property 'success' of undefined", error: "error in updating the item", show: true}}
    ]
    return store.dispatch(orderService.updateItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('handle error and displaying error messages when updating an item', () => { 
    fetchMock.postOnce(config.apiUrl+'/updateOrderItem', {
      status: 400
    });
    jest.useFakeTimers();
     const expectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: "400", error: "error in updating the item", show: true}}
    ]
    const updatedExpectedActions = [
      { type: orderActions.REQUEST_ORDERS },
      { type: errorActions.RECEIVE_ERROR, payload: {code: '400', error: "error in updating the item", show: true} },
      { type: errorActions.RESET_ERROR, payload: {code: "", error: "", show: false}}
    ]
    const store = mockStore({})
    return store.dispatch(orderService.updateItem('','','','')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6000);
      jest.runAllTimers();
      expect(store.getActions()).toEqual(updatedExpectedActions)
    })
  })

});