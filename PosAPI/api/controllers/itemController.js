'use strict';

const mongoose = require('mongoose');
const ItemModel = mongoose.model('Items');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UPLOAD_PATH = path.resolve(__dirname, '../uploads/images/');

const uploadImage = multer({
  // dest: UPLOAD_PATH,
  limits: {fileSize: 1000000, files: 1},
});


let addItem = function(req, res) {
  	let newItem = new ItemModel(req.body);
    let itemImage = {
      contentType: req.file.mimetype,
      image: req.file.buffer
    }
    newItem.image = itemImage;
  	newItem.save(function(err, item) {
    	if (err)
      		res.status(400).send(err);
    	res.json({ 
          itemId: item._id,
          message: 'Item ' + item.itemName + ' successfully added'
        });
  	});
};

let updateItem = function(req, res) {
	ItemModel.findOne({ _id: req.body._id }, function(error, item) {
		item.itemName = req.body.itemName;
		item.price = req.body.price;
		item.save(function(err, item) {
    		if (err)
      			res.status(400).send(err);
    		res.json({ 
          itemId: item._id,
          message: 'Item ' + item.itemName + ' successfully updated'
        });
  		});
	});
};

let listItems = function(req, res) {
	ItemModel.find({}, function(err, items) {
    	if (err)
      		res.status(400).send(err);
    	res.json(items);
  	});
}

let deleteItem = function(req, res) {
  ItemModel.deleteOne({
    itemName: req.body.itemId
  }, function(err, order) {
    if (err)
      res.status(400).send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};



module.exports = {addItem, updateItem, listItems, deleteItem, uploadImage}; 
