const assert = require('assert');
const Item = require('../../api/models/itemModel');

describe('Item', () => {
  it('should be invalid if the item name or price fields are empty', (done) => {
    const item = new Item();
    item.validate((err) => {
      assert.ok(err.errors.itemName);
      assert.ok(err.errors.price);
      done();
    });
  });

  it('should be invalid if the price is not a number', (done) => {
    const item = new Item({ price: 'value' });
    item.validate((err) => {
      assert.equal(err.errors.price.name, 'CastError');
      done();
    });
  });
});
