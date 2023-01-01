import * as orderActions from '../../actions/orderActions';

describe('Item actions', () => {
  it('should request order details', () => {
    const expectedAction = {
      type: orderActions.REQUEST_ORDERS,
    };
    expect(orderActions.requestOrders()).toEqual(expectedAction);
  });

  it('should receive order details', () => {
    const orders = {
      orderList: [
        {
          items: [],
          status: 'pending',
          createdDate: '2018-09-01T18:30:00.000Z',
        },
        {
          items: [],
          status: 'pending',
          createdDate: '2018-09-01T18:30:00.000Z',
        },
      ],
      userName: 'johns',
    };
    const expectedAction = {
      type: orderActions.RECEIVE_ORDERS,
      payload: orders,
    };
    expect(orderActions.receiveOrders(orders)).toEqual(expectedAction);
  });

  it('should update order details', () => {
    const orders = {
      orderList: [
        {
          items: [],
          status: 'pending',
          createdDate: '2018-09-01T18:30:00.000Z',
        },
        {
          items: [],
          status: 'pending',
          createdDate: '2018-09-01T18:30:00.000Z',
        },
      ],
      userName: 'johns',
    };
    const expectedAction = {
      type: orderActions.UPDATE_ORDERS,
      payload: orders,
    };
    expect(orderActions.updateOrders(orders)).toEqual(expectedAction);
  });
});
