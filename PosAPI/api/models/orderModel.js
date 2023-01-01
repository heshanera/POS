const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  orderList: [
    {
      orderId: String,
      items: [
        {
          itemId: String,
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          count: {
            type: Number,
            required: true,
          },
        },
      ],
      noOfItems: Number,
      total: Number,
      createdDate: {
        type: Date,
        default: Date.now,
      },
      status: String,
    },
  ],
});

module.exports = mongoose.model('Orders', OrderSchema);
