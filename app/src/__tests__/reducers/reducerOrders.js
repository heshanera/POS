import reducer from '../../reducers/reducerOrders'
import * as orderActions from '../../actions/orderActions'

describe('Order reducer', () => {
	let orders;
	beforeAll(() => {
		orders = {
			orderList: [
				{
					createdDate: '2018-09-01T18:30:00.000Z',
					items:[
						{
							count: 1,
							name: 'itemX',
							price: 1.3,
							_id: '5c668dcfa2bf5c19abf5de48'
						},
						{
							count: 1,
							name: 'itemY',
							price: 1.7,
							_id: '5c668dcfa2bf5c19abf5de49'
						}
					],
					status: 'pending',
					_id: '5c668dcfa2bf5c19abf5de47'
				},
				{
					createdDate: '2018-09-01T18:35:00.000Z',
					items:[
						{
							count: 1,
							name: 'itemA',
							price: 2.3,
							_id: '5c668dcfa2bf5c19abf5de49'
						},
						{
							count: 1,
							name: 'itemY',
							price: 1.7,
							_id: '5c668dcfa2bf5c19abf5de50'
						}
					],
					status: 'pending',
					_id: '5c668dcfa2bf5c19abf5de51'
				}
			]
		}

		JSON.parse = jest.fn(() => {
			return {};
		});
	})

	it('should return the initial state', () => {
	    const data = {};
	    expect(reducer(undefined, {})).toEqual(data);
  	});

	it('should handle REQUEST_ORDERS', () => {
	    expect(reducer({}, { type: orderActions.REQUEST_ORDERS }) ).toEqual({loading: true});
	    expect(reducer(orders, { type: orderActions.REQUEST_ORDERS })).toEqual({orderList: orders.orderList, loading: true});
	});

	it('should handle RECEIVE_ORDERS', () => {
		const newOrders = {
			orderList: [
				{
					createdDate: '2018-09-01T18:36:00.000Z',
					items:[
						{
							count: 1,
							name: 'itemX',
							price: 1.3,
							_id: '5c668dcfa2bf5c19abf5de58'
						},
						{
							count: 1,
							name: 'itemB',
							price: 1.9,
							_id: '5c668dcfa2bf5c19abf5de59'
						}
					],
					status: 'pending',
					_id: '5c668dcfa2bf5c19abf5de61'
				}
			]
		}
	    expect(reducer([], { type: orderActions.RECEIVE_ORDERS, payload: orders }) ).toEqual({orderList: orders.orderList, loading: false})
	    expect(reducer(orders, { type: orderActions.RECEIVE_ORDERS, payload: newOrders })).toEqual({orderList: newOrders.orderList, loading: false});
	});	

	it('should handle UPDATE_ORDERS', () => {
		const newOrders = {
			orderList: [
				{
					createdDate: '2018-09-01T18:36:00.000Z',
					items:[
						{
							count: 1,
							name: 'itemX',
							price: 1.3,
							_id: '5c668dcfa2bf5c19abf5de58'
						},
						{
							count: 1,
							name: 'itemB',
							price: 1.9,
							_id: '5c668dcfa2bf5c19abf5de59'
						}
					],
					status: 'pending',
					_id: '5c668dcfa2bf5c19abf5de61'
				}
			]
		}
	    expect(reducer([], { type: orderActions.UPDATE_ORDERS, payload: orders }) ).toEqual({orderList: orders.orderList, loading: false})
	    expect(reducer(orders, { type: orderActions.UPDATE_ORDERS, payload: newOrders })).toEqual({orderList: newOrders.orderList, loading: false});
	});	
});