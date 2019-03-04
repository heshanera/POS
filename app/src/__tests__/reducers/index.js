import reducer from '../../reducers/index'

describe('Order reducer', () => {

	it('should return the initial state', () => {
	    const data = {items: [], user: {}, userOrders: {}};
	    global.localStorage.clear();
	    expect(reducer(undefined, {})).toEqual(data);
  	});

  	it('should return the store data', () => {

  		const user = {
			firstName: 'John',
			lastName: 'Smith'
		}
  		const items = [
	      	{
		        image: {
		        	contentType: 'image/png',
		        	image: {
		        		type:'Buffer',
		        		data: [123,12,9,12,7]
		        	}
		        },
		        itemName: 'itemX',
		        price: 2.3,
		        _id: '5c7166a61dee2c23f58dce5d'
	      	},
	      	{
	      		image: {
		        	contentType: 'image/png',
		        	image: {
		        		type:'Buffer',
		        		data: [12,212,39,32,98]
		        	}
		        },
		        itemName: 'itemY',
		        price: 2.9,
		        _id: '5c7167441dee2c23f58dce61'
	      	}
	    ];
  		const orders = {
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

	    const data = {items: items, user: user, userOrders: orders};
	    expect(reducer(data, {})).toEqual(data);
  	});

});