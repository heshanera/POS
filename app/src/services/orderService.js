import { requestOrders, receiveOrders, updateOrders } from '../actions/orderActions';
import { loggedIn } from '../actions/loginActions';
import config from './config';

const fetchOrders = (username, history) => {
 const data = "username="+username;
 return dispatch => {
   dispatch(requestOrders());
   return fetch(config.apiUrl+'/getOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((orders) => {
      console.log(orders);
      // storing the order list in the local storage
      localStorage.setItem('orders', JSON.stringify(orders));

      dispatch(receiveOrders(orders));
      if (!(Object.keys(orders).length === 0)) {
        history.push('/orders');
      }
   },
  )
  .catch((e) => {
    console.log('invalid username');
   }
  );
 };
}

const removeItem = (orderId, itemId) => {
  return dispatch => {
    // delete the item from the local storage
    let orders = JSON.parse(localStorage.getItem('orders'));
    // update the order list
    const i = orders.orderList.findIndex(order => order._id === orderId);
    if (orders.orderList[i].items.length > 1) {
      orders.orderList[i].items = orders.orderList[i].items.filter( item => item._id !== itemId );  
    } else {
      // delete the order when removing the last item of the order
      // TODO :
    }
    
    localStorage.setItem('orders', JSON.stringify(orders));
    dispatch(updateOrders(orders));

    console.log(orders);

    // TODO :
    // update the database

 };
}

const addItem = (orderId, itemId) => {

}


const orderService = { fetchOrders, removeItem, addItem };
export default orderService;