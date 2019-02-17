'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let OrderSchema = new Schema({
  userName: {
    type: String
  },
  orderList: [{
      orderId:String,
      items: [{
        itemId: String,
        name: String,
        price: Number
      }],
      noOfItems: Number,
      total: Number,
      createdDate: Date,
      status: String
  }]

});

module.exports = mongoose.model('Orders', OrderSchema);
