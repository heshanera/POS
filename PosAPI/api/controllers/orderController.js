/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const OrderModel = mongoose.model('Orders');

const createOrder = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((orderList) => {
      if (orderList !== null) {
        throw new Error('username already exists');
      } else {
        if (!req.body.username || !req.body.orderList) throw new Error('invalid parameters');
        const newOrderList = {
          userName: req.body.username,
          orderList: req.body.orderList,
        };
        const newOrder = new OrderModel(newOrderList);
        newOrder.save().then((order) => {
          res.json(order);
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeOrderList = function (req, res) {
  OrderModel.deleteOne({
    userName: req.body.username,
  })
    .then((order) => {
      if (order.deletedCount === 0) throw new Error('invalid username');
      else res.json({ message: 'Orders successfully deleted' });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const listOrders = function (req, res) {
  OrderModel.find({})
    .then((order) => {
      if (order.length > 0) res.json(order);
      else throw new Error('no orders');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const addOrder = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((userOrders) => {
      const newOrder = {
        items: req.body.items,
        status: req.body.status,
      };
      if (newOrder.items.length < 1) throw new Error('no items');
      userOrders.orderList.push(newOrder);
      userOrders.save().then((orders) => {
        res.json(orders.orderList[orders.orderList.length - 1]);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeOrder = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((userOrders) => {
      const noOfOrders = userOrders.orderList.length;
      userOrders.orderList = userOrders.orderList.filter((order) => order._id !== req.body.orderId);
      if (noOfOrders === userOrders.orderList.length) throw new Error('invalid order');
      userOrders.save(userOrders).then((orders) => {
        res.json(orders.orderList.length);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const addOrderItem = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((userOrders) => {
      if (!(req.body.itemName && req.body.price && req.body.count)) throw new Error('invalid item data');
      const newItem = {
        name: req.body.itemName,
        price: req.body.price,
        count: req.body.count,
      };
      const i = userOrders.orderList.findIndex((order) => order._id === req.body.orderId);
      userOrders.orderList[i].items.push(newItem);
      userOrders.save().then((userOrdersData) => {
        res.json(userOrdersData.orderList[i].items.slice(-1)[0]);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateOrderItem = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((userOrders) => {
      // get the index of the order
      const i = userOrders.orderList.findIndex((order) => order._id === req.body.orderId);
      // index of the item
      const itemIndex = userOrders.orderList[i].items.findIndex((item) => item.name === req.body.itemName);
      // update the item details
      userOrders.orderList[i].items[itemIndex].count = req.body.count;
      userOrders.save().then((orders) => {
        res.json(orders.orderList[i].items[itemIndex]);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeOrderItem = function (req, res) {
  OrderModel.findOne({ userName: req.body.username })
    .then((userOrders) => {
      const i = userOrders.orderList.findIndex((order) => order._id === req.body.orderId);
      let orderRemoved = false;
      if (userOrders.orderList[i].items.length > 1) {
        userOrders.orderList[i].items = userOrders.orderList[i].items.filter((item) => item._id !== req.body.itemId);
      } else {
        // delete the order when removing the last item of the order
        userOrders.orderList.splice(i, 1);
        orderRemoved = true;
      }
      userOrders.save().then((orders) => {
        if (orders.orderList[i]) {
          if (!orderRemoved) res.json(orders.orderList[i].items.length);
          else res.json(0);
        } else res.json(0);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getOrders = function (req, res) {
  OrderModel.find({
    userName: req.params.username,
  })
    .then((user) => {
      if (user.length > 0) res.json(user[0]);
      else throw new Error('invalid user');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  createOrder,
  removeOrderList,
  listOrders,
  addOrder,
  removeOrder,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  getOrders,
};
