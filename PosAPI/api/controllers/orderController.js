'use strict';

const mongoose = require('mongoose'),
Order = mongoose.model('Orders');

let createOrder = function(req, res) {
  var newOrder = new Order(req.body);
  newOrder.save(function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

let deleteOrder = function(req, res) {
  Order.remove({
    _id: req.params.orderId
  }, function(err, order) {
    if (err)
      res.send(err);
    res.json({ message: 'Order successfully deleted' });
  });
};

let listOrders = function(req, res) {
  Order.find({}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

let getOrders = function(req, res) {
  Order.find({
    userName: req.body.username
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user[0]);
  });
};

module.exports = {createOrder, deleteOrder, listOrders, getOrders}; 