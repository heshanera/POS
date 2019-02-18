'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ItemSchema = new Schema({
  itemName: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model('Items', ItemSchema);
