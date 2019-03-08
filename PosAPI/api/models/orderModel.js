'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let OrderSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  orderList: [{
      orderId:String,
      items: [{
        itemId: String,
        name: {
          type: String,
          required: true
        },
        price: Number,
        count: Number
      }],
      noOfItems: Number,
      total: Number,
      createdDate: Date,
      status: String
  }]

});

module.exports = mongoose.model('Orders', OrderSchema);
