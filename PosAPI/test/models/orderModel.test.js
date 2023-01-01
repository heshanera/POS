const assert = require('assert');
const Order = require('../../api/models/orderModel');

describe('Order', () => {
  it('should be invalid if the username is empty', (done) => {
    const order = new Order();
    order.validate((err) => {
      assert.ok(err.errors.userName);
      done();
    });
  });

  it('should generate the current date and time when saving an order', (done) => {
    const order = new Order({
      userName: 'johns',
      orderList: [
        {
          items: [
            {
              name: 'itemX',
              price: 1.2,
            },
          ],
        },
      ],
    });
    assert.equal(order.orderList[0].createdDate.toJSON().slice(0, 19), new Date().toJSON().slice(0, 19));
    done();
  });

  it('should throw an error if the item name, price and count of an order is not given', (done) => {
    const order = new Order({
      userName: 'johns',
      orderList: [{ items: [{}] }],
    });
    order.validate((err) => {
      assert.ok(err.errors['orderList.0.items.0.name']);
      assert.ok(err.errors['orderList.0.items.0.price']);
      assert.ok(err.errors['orderList.0.items.0.count']);
      done();
    });
  });

  it('should throw an error if the price and count data types are invalid', (done) => {
    const order = new Order({
      userName: 'johns',
      orderList: [
        {
          items: [
            {
              itemName: 'itemX',
              price: 'value1',
              count: 'value2',
            },
          ],
        },
      ],
    });
    order.validate((err) => {
      assert.equal(err.errors['orderList.0.items.0.price'].name, 'CastError');
      assert.equal(err.errors['orderList.0.items.0.count'].name, 'CastError');
      done();
    });
  });
});
