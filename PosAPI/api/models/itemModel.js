const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    contentType: String,
    image: Buffer,
  },
});

module.exports = mongoose.model('Items', ItemSchema);
