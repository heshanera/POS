import { requestOrders, receiveOrders, updateOrders } from '../actions/orderActions';
import { loggedIn } from '../actions/loginActions';
import config from './config';

const fetchOrders = (username, history) => {
 const data = "username="+username;
 const token = JSON.parse(localStorage.getItem('user')).token;
 return dispatch => {
   dispatch(requestOrders());
   return fetch(config.apiUrl+'/getOrders', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
    )
   .then((orders) => {

      // If authentication fails
      if (orders.success == false) {
        // DO NOTHING: TODO
      } else {
        console.log(orders);
        // storing the order list in the local storage
        localStorage.setItem('orders', JSON.stringify(orders));

        dispatch(receiveOrders(orders));
        if (!(Object.keys(orders).length === 0)) {
          history.push('/orders');
        }
      }
   })
  .catch((e) => {
    console.log('invalid username');
   });
 };
}

const addOrder = (newOrder) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  let data = newOrder;  
  data.username = user.username;
  data = JSON.stringify(data);
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/addOrder', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
    )
    .then((order) => {

       // If authentication fails
      if (order.success == false) {
        // DO NOTHING: TODO
      } else {
        // update the local storage
        let orders = JSON.parse(localStorage.getItem('orders'));
        // const i = orders.orderList.findIndex(order => order._id === orderId);
        orders.orderList.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        dispatch(updateOrders(orders));
      }
    })
    .catch((e) => {
      console.log('error in adding the new order\n' + e);
    });
 };
}

const removeItem = (orderId, itemId) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user.token;
  let data = {
    username:user.username,
    orderId: orderId,
    itemId: itemId
  }
  data = JSON.stringify(data);
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/removeOrderItem', {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
    )
    .then((orderSize) => {

      // If authentication fails
      if (orderSize.success == false) {
        // DO NOTHING: TODO
      } else {
        // update the local storage
        let orders = JSON.parse(localStorage.getItem('orders'));
        const i = orders.orderList.findIndex(order => order._id === orderId);
        // check if the item is removed from the database
        if (orderSize < orders.orderList[i].items.length) {
          // update the order list
          if (orders.orderList[i].items.length > 1) {
            orders.orderList[i].items = orders.orderList[i].items.filter( item => item._id !== itemId );  
          } else {
            // delete the order when removing the last item of the order
            orders.orderList.splice(i,1);
          }
          localStorage.setItem('orders', JSON.stringify(orders));
          dispatch(updateOrders(orders));
        }
      }
    })
    .catch((e) => {
      console.log('error in removing the item' );
    });
  };
}

const addItem = (orderId, itemName, price, count) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  let data = {
    username: user.username,
    orderId: orderId,
    itemName: itemName,
    price: price,
    count: count
  }              
  data = JSON.stringify(data);  
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/addOrderItem', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
    )
    .then((item) => {

       // If authentication fails
      if (item.success == false) {
        // DO NOTHING: TODO
      } else {
        // update the local storage
        let orders = JSON.parse(localStorage.getItem('orders'));
        const i = orders.orderList.findIndex(order => order._id === orderId);
        orders.orderList[i].items.push(item);
        localStorage.setItem('orders', JSON.stringify(orders));
        dispatch(updateOrders(orders));
      }
    })
    .catch((e) => {
      console.log('error in adding the new item ' + itemName);
    });
 };
}

const updateItem = (orderId, itemName, price, count) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  let data = {
    username: user.username,
    orderId: orderId,
    itemName: itemName,
    price: price,
    count: count,
  }
  data = JSON.stringify(data);
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/updateOrderItem', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
    )
    .then((item) => {

       // If authentication fails
      if (item.success == false) {
        // DO NOTHING: TODO
      } else {
        // get data from local storage
        let orders = JSON.parse(localStorage.getItem('orders'));
        const i = orders.orderList.findIndex(order => order._id === orderId);
        // index of the item    
        const itemIndx = orders.orderList[i].items.findIndex((item => item.name == itemName));
        // update the item details
        orders.orderList[i].items[itemIndx].count = count;
        // update the local storage
        localStorage.setItem('orders', JSON.stringify(orders));
        dispatch(updateOrders(orders));
      }
    })
    .catch((e) => {
      console.log('error in adding the new item ' + itemName + '\ne');
    });
 };
}

const orderService = { fetchOrders, addOrder, removeItem, addItem, updateItem };
export default orderService;