const middleware = require('../middleware/middleware');
const order = require('../controllers/orderController');
const user = require('../controllers/userController');
const item = require('../controllers/itemController');

module.exports = function (app) {
  /// //////// Users ////////////////

  // params = {
  //  username: string, password: string,
  //  firstName: string, lastName: string
  // }
  app.route('/addUser').post(user.addUser); // add new user

  app.route('/listUsers').get(middleware.checkToken).get(user.listUsers); // list all current users

  // params = {username: string, password: string}
  app.route('/getUser').post(user.getUser); // return a user

  // params = {
  //  username: string, password: string
  // }
  app.route('/deleteUser').delete(middleware.checkToken).delete(user.deleteUser); // delete a user

  /// //////// Items ////////////////

  // params = {itemName: string, price: number, image: file}
  app.route('/addItem').post(middleware.checkToken).post(item.uploadImage.single('file')).post(item.addItem); // add a new item to the available items

  // params = {_id: string, itemName: string, price: number}
  app.route('/updateItem').post(middleware.checkToken).post(item.updateItem); // update details of an existing item

  app.route('/getItems').get(middleware.checkToken).get(item.getItems); // list all available items

  app.route('/deleteItem').delete(middleware.checkToken).delete(item.deleteItem); // Delete a given item

  /// //////// Orders ////////////////

  app.route('/createOrder').post(order.createOrder); // create new orderlist for a new user

  app.route('/removeOrderList').delete(middleware.checkToken).delete(order.removeOrderList); // delete all orders of a user

  app.route('/listOrders').get(middleware.checkToken).get(order.listOrders); // list all the orders of all users

  app.route('/addOrder').post(middleware.checkToken).post(order.addOrder); // create new order for a user

  app.route('/removeOrder').delete(middleware.checkToken).delete(order.removeOrder); // remove an order from user order list

  app.route('/getOrders/:username').get(middleware.checkToken).get(order.getOrders); // return an order list of the requested user

  // params = {username: string, orderId: string, itemName: string, price: number, count: number}
  app.route('/addOrderItem').post(middleware.checkToken).post(order.addOrderItem); // add item to an existing order

  // params = {username: string, orderId: string, itemName: string, price: number, count: number}
  app.route('/updateOrderItem').post(middleware.checkToken).post(order.updateOrderItem); // update item count

  // params = {username: string, orderId: string, itemId: string}
  app.route('/removeOrderItem').delete(middleware.checkToken).delete(order.removeOrderItem); // remove an item from exiting order

  /// //////// Other ////////////////

  app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  });
};
