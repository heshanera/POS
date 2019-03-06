const request = require('supertest');
const server = require('../server');
const Item = require('../api/models/itemModel');

describe('API testing for available items', () => {

	let token = '';
	let itemId = '';
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

	describe('POST /addItem', () => {
	    it('respond with 200 when the item is successfully added', (done) => {
	    	request(server)
	    			.post('/addItem')
	    			.set('Authorization', token)
	    			.field('itemName', 'cupcake')
	    			.field('price', '1.4')
              		.attach('file', '/home/heshane/Projects/POS/PosAPI/test/resources/imgs/cupcake.png')
              		.expect((response) => {
              			itemId = JSON.parse(response.text).itemId
              		})
	            	.expect(200, done);
	    });

	    it('respond with 400 when error adding the new item', (done) => {
	    	done()
	    });
	});

	describe('POST /updateItem', () => {
	    it('respond with 200 when the item is successfully updates', (done) => {
	    	const itemDetails = {
	    		_id: itemId, 
	    		itemName: 'cupcake', 
	    		price: 1.5
	    	};
	    	request(server)
	    			.post('/updateItem')
	    			.set('Authorization', token)
	    			.send(itemDetails)
              		.expect((response) => {
              			itemId = JSON.parse(response.text).itemId
              		})
	            	.expect(200, done);	
	    });

	    it('respond with 400 when error updating the new item', (done) => {
	    	done()
	    });
	});

	describe('POST /getItems', () => {
	    it('respond with 200 when the items are successfully received', (done) => {
	    	request(server)
	    			.post('/getItems')
	    			.set('Authorization', token)
	            	.expect(200, done);	
	    });
	});

	describe('DELETE /deleteItem', () => {
	    it('respond with 200 when the item is successfully deleted', (done) => {
	    	const item = {
	    		_id: itemId
	    	};
	    	request(server)
	    			.delete('/deleteItem')
	    			.set('Authorization', token)
	    			.send(item)
	            	.expect(200, done);	
	    });
	});

});