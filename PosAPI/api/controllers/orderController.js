'use strict';

const mongoose = require('mongoose'),
OrderModel = mongoose.model('Orders');

let createOrder = function(req, res) {
  var newOrder = new OrderModel(req.body);
  newOrder.save(function(err, order) {
    if (err)
      res.status(400).send(err);
    else res.json(order);
  });
};

let removeOrderList = function(req, res) {
  OrderModel.deleteOne({
    username: req.body.username
  }, function(err, order) {
    if (err)
      res.status(400).send(err);
    else res.json({ message: 'Order successfully deleted' });
  });
};

let listOrders = function(req, res) {
  OrderModel.find({}, function(err, order) {
    if (err)
      res.status(400).send(err);
    else res.json(order);
  });
};

let addOrder = function(req, res) {
  OrderModel.findOne({ userName: req.body.username }, function(err, userOrders) {
    const newOrder = {
      items: req.body.items,
      status: req.body.status,
      createdDate: new Date(new Date().toUTCString())
    };
    userOrders.orderList.push(newOrder);
    userOrders.save(function(err, userOrders) {
      if (err)
        res.send(err);
      res.json(userOrders.orderList[userOrders.orderList.length-1]);
    })
  });
};

let removeOrder = function(req, res) {
  OrderModel.findOne({ userName: req.body.username }, function(err, userOrders) {
    userOrders.orderList = userOrders.orderList.filter( order => order._id != req.body.orderId );
    userOrders.save(function(err, userOrders) {
      if (err)
        res.send(err);
      res.json(userOrders.orderList.length);
    })
  });
};

let addOrderItem = function(req, res) {
  OrderModel.findOne({ userName: req.body.username }, function(err, userOrders) {
    const newItem = {
      name: req.body.itemName,
      price: req.body.price,
      count: req.body.count,
    };
    const i = userOrders.orderList.findIndex(order => order._id == req.body.orderId);
    userOrders.orderList[i].items.push(newItem);
    userOrders.save(function(err, userOrders) {
      if (err)
        res.send(err);
      res.json(userOrders.orderList[i].items.slice(-1)[0]);
    })
  });
};

let updateOrderItem = function(req, res) {
  OrderModel.findOne({ userName: req.body.username }, function(err, userOrders) {
    // get the index of the order
    const i = userOrders.orderList.findIndex(order => order._id == req.body.orderId);
    // index of the item    
    const itemIndex = userOrders.orderList[i].items.findIndex((item => item.name == req.body.itemName));
    // update the item details
    userOrders.orderList[i].items[itemIndex].count = req.body.count;
    userOrders.save(function(err, userOrders) {
      if (err)
        res.send(err);
      res.json(userOrders.orderList[i].items[itemIndex]);
    })
  });
};

let removeOrderItem = function(req, res) {
  OrderModel.findOne({ userName: req.body.username }, function(err, userOrders) {
    const i = userOrders.orderList.findIndex(order => order._id == req.body.orderId);
    if (userOrders.orderList[i].items.length > 1) {
      userOrders.orderList[i].items = userOrders.orderList[i].items.filter( item => item._id != req.body.itemId );  
    } else {
      // delete the order when removing the last item of the order
      userOrders.orderList.splice(i,1);
    }
    userOrders.save(function(err, userOrders) {
      if (err)
        res.send(err);
      else if (userOrders.orderList[i])
        res.json(userOrders.orderList[i].items.length);
      else
        res.json(0);
    })
  });
};

let getOrders = function(req, res) {
  OrderModel.find({
    userName: req.body.username
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user[0]);
  });
};

module.exports = {
  createOrder, removeOrderList, listOrders, addOrder, removeOrder, 
  addOrderItem, updateOrderItem, removeOrderItem, getOrders
}; 