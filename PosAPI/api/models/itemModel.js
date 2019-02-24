'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  itemName: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
  	contentType: String,
  	image: Buffer
  }
});

module.exports = mongoose.model('Items', ItemSchema);
