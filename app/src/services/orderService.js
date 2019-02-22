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

const removeItem = (orderId, itemId) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user.token;
  const data = "username="+user.username+
                "&orderId="+orderId+
                "&itemId="+itemId;
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/removeOrderItem', {
        method: 'DELETE',
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

const addItem = (orderId, itemName, price) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const data = "username="+user.username+
                "&orderId="+orderId+
                "&itemName="+itemName+
                "&price="+price;
  return dispatch => {
    // update the database
    dispatch(requestOrders());
    return fetch(config.apiUrl+'/addOrderItem', {
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


const orderService = { fetchOrders, removeItem, addItem };
export default orderService;