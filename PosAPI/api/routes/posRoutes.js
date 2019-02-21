'use strict';
module.exports = function(app) {
  let order = require('../controllers/orderController');
  let user = require('../controllers/userController');
  let item = require('../controllers/itemController');

  /////////// Users ////////////////

  // params = {
  //  username: string, password: string, 
  //  firstName: string, lastName: string
  // }
  app.route('/user')
    .post(user.addUser); // add new user

  app.route('/user')
    .get(user.listUsers); // list all current users

  // params = {username: string, password: string}
  app.route('/getUser')
    .post(user.getUser); // return a user

  // params = {userId: string}
  app.route('/user/:userId')
    .delete(user.deleteUser); // delete a user


  /////////// Items ////////////////

  // params = {itemName: string, price: number}
  app.route('/addItem')
    .post(item.addItem); // add a new item to the available items

  // params = {_id: string, itemName: string, price: number}
  app.route('/updateItem')
    .post(item.updateItem); // update details of an existing item

  app.route('/getItems')
    .post(item.listItems); // list all available items


  /////////// Orders ////////////////

  app.route('/orders')
    .post(order.createOrder)
    .get(order.listOrders); // list all the orders of all users

  app.route('/orders/:orderId')
    .delete(order.deleteOrder); // delete an order

  app.route('/getOrders')
    .post(order.getOrders); // return an order list of the requested user

  // params = {username: string, orderId: string, itemName: string, price: number}
  app.route('/addOrderItem')
    .post(order.addOrderItem); // add item to an existing order

  // params = {username: string, orderId: string, itemId: string}
  app.route('/removeOrderItem')
    .delete(order.removeOrderItem); // remove an item from exiting order

  app.use(function(req, res) {
	  res.status(404).send({url: req.originalUrl + ' not found'})
  });
};