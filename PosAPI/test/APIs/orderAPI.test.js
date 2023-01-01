/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const server = require('../../server');
require('../../api/models/orderModel');

describe('API testing for order and order items', () => {
  let token = '';
  const orderIdList = [];
  const itemIdList = [];
  describe('Creating an authorized user', () => {
    it('respond with user details and an authentication token', (done) => {
      const userCredentials = {
        username: 'johns',
        password: 'pass',
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
        username: 'johns',
        orderList: [
          {
            items: [
              {
                count: 1,
                name: 'itemX',
                price: 1.3,
              },
            ],
            status: 'pending',
          },
        ],
      };
      request(server).post('/createOrder').send(newOrderList).expect(200, done);
    });

    it('respond with 400 when error adding the new item', (done) => {
      const newOrderList = {
        orderList: [
          {
            items: [
              {
                count: 1,
                name: 'itemX',
                price: 1.3,
              },
              {
                count: 2,
                name: 'itemY',
                price: 1.8,
              },
            ],
            status: 'pending',
          },
        ],
      };
      request(server).post('/createOrder').send(newOrderList).expect(400, done);
    });

    it('respond with 400 when the user already exists', (done) => {
      const newOrderList = {
        username: 'johns',
        orderList: [],
      };
      request(server).post('/createOrder').send(newOrderList).expect(400, done);
    });
  });

  describe('GET /listOrders', () => {
    it('respond with 200 when the orderList is successfully received', (done) => {
      request(server).get('/listOrders').set('Authorization', token).expect(200, done);
    });
  });

  describe('POST /addOrder', () => {
    it('respond with 200 when an order is successfully added', (done) => {
      const newOrder = {
        username: 'johns',
        items: [
          {
            count: 2,
            name: 'itemY',
            price: 1.8,
          },
        ],
        status: 'pending',
      };

      request(server).post('/addOrder').set('Authorization', token).send(newOrder).expect(200, done);
    });

    it('respond with 400 when error adding an order', (done) => {
      const newOrder = {
        username: 'johns',
        items: [],
        status: 'pending',
      };

      request(server).post('/addOrder').set('Authorization', token).send(newOrder).expect(400, done);
    });
  });

  describe('GET /getOrders', () => {
    it('respond with 200 when user orders are successfully received', (done) => {
      request(server)
        .get('/getOrders/johns')
        .set('Authorization', token)
        .expect((response) => {
          // getting the order ids and the item ids
          orderIdList.push(JSON.parse(response.text).orderList[0]._id);
          orderIdList.push(JSON.parse(response.text).orderList[1]._id);

          itemIdList.push([JSON.parse(response.text).orderList[0].items[0]._id]);
          itemIdList.push([JSON.parse(response.text).orderList[1].items[0]._id]);
        })
        .expect(200, done);
    });

    it('respond with 400 when receiving user orders', (done) => {
      request(server).get('/getOrders/invalid').set('Authorization', token).expect(400, done);
    });
  });

  describe('POST /addOrderItem', () => {
    it('respond with 200 when an item is successfully added to an order', (done) => {
      const newItem = {
        username: 'johns',
        itemName: 'itemA',
        price: 1.3,
        count: 1,
        orderId: orderIdList[1],
      };
      request(server).post('/addOrderItem').set('Authorization', token).send(newItem).expect(200, done);
    });

    it('respond with 400 when error in adding a new item to an order', (done) => {
      const newItem = {
        username: 'johns',
        orderId: 'saydgu',
      };
      request(server).post('/addOrderItem').set('Authorization', token).send(newItem).expect(400, done);
    });
  });

  describe('POST /updateOrderItem', () => {
    it('respond with 200 when an order is successfully updated', (done) => {
      const newItem = {
        username: 'johns',
        itemName: 'itemA',
        count: 1,
        orderId: orderIdList[1],
      };
      request(server)
        .post('/updateOrderItem')
        .set('Authorization', token)
        .send(newItem)
        .expect((response) => {
          itemIdList[1].push(JSON.parse(response.text)._id);
        })
        .expect(200, done);
    });

    it('respond with 400 when error in updating an order', (done) => {
      const newItem = {
        username: 'john',
      };
      request(server).post('/updateOrderItem').set('Authorization', token).send(newItem).expect(400, done);
    });
  });

  describe('DELETE /removeOrderItem', () => {
    it('respond with 200 when an order item is successfully removed', (done) => {
      const item1 = {
        username: 'johns',
        itemId: itemIdList[1][1],
        orderId: orderIdList[1],
      };

      request(server).delete('/removeOrderItem').set('Authorization', token).send(item1).expect('1').expect(200);

      const item2 = {
        username: 'johns',
        itemId: itemIdList[0][0],
        orderId: orderIdList[0],
      };

      request(server).delete('/removeOrderItem').set('Authorization', token).send(item2).expect('0').expect(200, done);
    });

    it('respond with 200 when an order item is successfully removed', (done) => {
      const item3 = {
        username: 'johns',
        itemId: itemIdList[1][0],
        orderId: orderIdList[1],
      };
      request(server).delete('/removeOrderItem').set('Authorization', token).send(item3).expect(200, done);
    });

    it('respond with 200 when the last item is successfully removed with the last order in the list', (done) => {
      const newItem = {
        username: 'johns',
        itemName: 'itemA',
        orderId: orderIdList[1],
      };
      request(server).delete('/removeOrderItem').set('Authorization', token).send(newItem).expect(200, done);
    });

    it('respond with 400 when error in updating an order', (done) => {
      const newItem = {
        username: 'john',
      };
      request(server).delete('/removeOrderItem').set('Authorization', token).send(newItem).expect({}).expect(400, done);
    });
  });

  describe('DELETE /removeOrder', () => {
    it('respond with 200 when an order is successfully removed', (done) => {
      let orderId = '';
      const newOrder = {
        username: 'johns',
        items: [
          {
            count: 1,
            name: 'itemY',
            price: 1.8,
          },
        ],
        status: 'pending',
      };
      request(server)
        .post('/addOrder')
        .set('Authorization', token)
        .send(newOrder)
        .expect((response) => {
          orderId = JSON.parse(response.text)._id;
        })
        .expect(200)
        .end(() => {
          request(server)
            .delete('/removeOrder')
            .set('Authorization', token)
            .send({
              username: 'johns',
              orderId,
            })
            .expect(200, done);
        });
    });

    it('respond with 400 when error adding an order', (done) => {
      const orderInfo = {
        username: 'johns',
        orderId: orderIdList[1],
      };

      request(server).delete('/removeOrder').set('Authorization', token).send(orderInfo).expect(400, done);
    });
  });

  describe('DELETE /removeOrderList', () => {
    it('respond with 200 when the orderList is successfully deleted', (done) => {
      request(server)
        .delete('/removeOrderList')
        .set('Authorization', token)
        .send({ username: 'johns' })
        .expect(200, done);
    });

    it('respond with 400 when error deleting the order list', (done) => {
      request(server)
        .delete('/removeOrderList')
        .set('Authorization', token)
        .send({ username: 'john' })
        .expect(400, done);
    });
  });

  describe('GET /listOrders', () => {
    it('respond with 400 when error receiving the order list', (done) => {
      request(server).get('/listOrders').set('Authorization', token).expect(400, done);
    });
  });
});
