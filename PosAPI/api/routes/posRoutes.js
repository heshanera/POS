'use strict';
module.exports = function(app) {
  var order = require('../controllers/orderController');
  var user = require('../controllers/userController');

  app.route('/orders')
    .post(order.createOrder)
    .get(order.listOrders);

  app.route('/orders/:orderId')
    .delete(order.deleteOrder);

  // return order list of the requested user
  app.route('/getOrders')
    .post(order.getOrders);	  

  app.route('/user')
  	.post(user.addUser)
  	.get(user.listUsers);

  // return the user
  app.route('/getUser')
    .post(user.getUser);

  app.route('/user/:userId')
    .delete(user.deleteUser);

  app.use(function(req, res) {
	  res.status(404).send({url: req.originalUrl + ' not found'})
  });
};