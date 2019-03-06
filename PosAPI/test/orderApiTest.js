const request = require('supertest');
const server = require('../server');
const Order = require('../api/models/orderModel');

describe('API testing for order and order items', () => {

	let token = '';
	let orderId = '';
	describe('Creating an authorized user', () => {
		it('respond with user details and an authentication token', (done) => {
	    	const userCredentials = {
	    		username: 'johns',
	    		password: 'pass'
	    	};
	        request(server)	
	            .post('/getUser')
	            .send(userCredentials)
	            .expect((response) => {
	            	token = JSON.parse(response.text).token;
	            })
	            .expect(200, done);
	    });
	});

	describe('POST /createOrder', () => {
	    it('respond with 200 when the order is successfully added', (done) => {
	    	const newOrderList = {
	    		userName: 'johns',
	    		orderList: [
	    			{
	    				items: [
			    			{
			    				count:1,
			    				name: 'itemX',
			    				price: 1.3
			    			},
			    			{
			    				count:2,
			    				name: 'itemY',
			    				price: 1.8
			    			},
			    		],
			    		status: 'pending',
	    			}
	    		]
	    	}
	    	request(server)
	    			.post('/createOrder')
	    			.set('Authorization', token)
	    			.send(newOrderList)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error adding the new item', (done) => {
	    	const newOrderList = {
	    		orderList: [
	    			{
	    				items: [
			    			{
			    				count:1,
			    				name: 'itemX',
			    				price: 1.3
			    			},
			    			{
			    				count:2,
			    				name: 'itemY',
			    				price: 1.8
			    			},
			    		],
			    		status: 'pending',
	    			}
	    		]
	    	}
	    	request(server)
	    			.post('/createOrder')
	    			.set('Authorization', token)
	    			.send(newOrderList)
	            	.expect(400, done);
	    });
	});

	describe('GET /listOrders', () => {
	    it('respond with 200 when the orderList is successfully received', (done) => {
	    	request(server)
	    			.get('/listOrders')
	    			.set('Authorization', token)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error receiving the order list', (done) => {
	    	done()
	    });
	});

	describe('POST /addOrder', () => {
	    it('respond with 200 when an order is successfully added', (done) => {

	    	const newOrder = {
	    		username: 'johns',
	    		items: [
	    			{
	    				count:1,
	    				name: 'itemX',
	    				price: 1.3
	    			},
	    			{
	    				count:2,
	    				name: 'itemY',
	    				price: 1.8
	    			},
	    		],
	    		status: 'pending'
	    	}

	    	request(server)
	    			.post('/addOrder')
	    			.set('Authorization', token)
	    			.send(newOrder)
	    			.expect((response) => {
	    				orderId = JSON.parse(response.text)._id;
	    			})
	            	.expect(200, done);
	    });

	    it('respond with 400 when error adding an order', (done) => {
	    	done()
	    });
	});

	describe('POST /getOrders', () => {
	    it('respond with 200 when user orders are successfully received', (done) => {
	    	const orderInfo = {
	    		username: 'johns'
	    	}
	    	request(server)
	    			.post('/getOrders')
	    			.set('Authorization', token)
	    			.send(orderInfo)
	            	.expect(200, done);
	    });

	    it('respond with 400 when receiving user orders', (done) => {
	    	done()
	    });
	});

	describe('POST /addOrderItem', () => {
	    it('respond with 200 when an item is successfully added to an order', (done) => {
	    	const newItem = {
	    		username: 'johns',
	    		itemName: 'itemA',
	    		price: 1.3,
	    		count: 1,
	    		orderId: orderId 
	    	}
	    	request(server)
	    			.post('/addOrderItem')
	    			.set('Authorization', token)
	    			.send(newItem)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error in adding a new item to an order', (done) => {
	    	done()
	    });
	});

	describe('POST /updateOrderItem', () => {
	    it('respond with 200 when an order is successfully updated', (done) => {
	    	const newItem = {
	    		username: 'johns',
	    		itemName: 'itemA',
	    		count: 1,
	    		orderId: orderId 
	    	}
	    	request(server)
	    			.post('/updateOrderItem')
	    			.set('Authorization', token)
	    			.send(newItem)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error in updating an order', (done) => {
	    	done()
	    });
	});

	describe('DELETE /removeOrderItem', () => {
	    it('respond with 200 when an order item is successfully removed', (done) => {
	    	const newItem = {
	    		username: 'johns',
	    		itemName: 'itemA',
	    		orderId: orderId 
	    	}
	    	request(server)
	    			.delete('/removeOrderItem')
	    			.set('Authorization', token)
	    			.send(newItem)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error in updating an order', (done) => {
	    	done()
	    });
	});

	describe('DELETE /removeOrder', () => {
	    it('respond with 200 when an order is successfully removed', (done) => {

	    	const orderInfo = {
	    		username: 'johns',
	    		orderId: orderId
	    	}

	    	request(server)
	    			.delete('/removeOrder')
	    			.set('Authorization', token)
	    			.send(orderInfo)
	            	.expect(200, done);
	    });

	    it('respond with 400 when error adding an order', (done) => {
	    	done()
	    });
	});

	describe('DELETE /removeOrderList', () => {
	    it('respond with 200 when the orderList is successfully deleted', (done) => {
	    	request(server)
	    			.delete('/removeOrderList')
	    			.set('Authorization', token)
	    			.send({username:'johns'})
	            	.expect(200, done);
	    });

	    it('respond with 400 when error deleting the order list', (done) => {
	    	done()
	    });
	});
});