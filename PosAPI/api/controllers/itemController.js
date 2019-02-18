'use strict';

const mongoose = require('mongoose'),
ItemModel = mongoose.model('Items');

let addItem = function(req, res) {
  	var newItem = new ItemModel(req.body);
  	newItem.save(function(err, item) {
    	if (err)
      		res.send(err);
    	res.json(item);
  	});
};

let updateItem = function(req, res) {
	ItemModel.findOne({ _id: req.body._id }, function(err, item) {
		item.itemName = req.body.itemName;
		item.price = req.body.price;
		item.save(function(err, item) {
    		if (err)
      			res.send(err);
    		res.json(item);
  		});
	});
};

let listItems = function(req, res) {
	ItemModel.find({}, function(err, items) {
    	if (err)
      		res.send(err);
    	res.json(items);
  	});
}



module.exports = {addItem, updateItem, listItems}; 
