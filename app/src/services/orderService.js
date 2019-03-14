import { requestOrders, receiveOrders, updateOrders } from '../actions/orderActions';
import { receiveError, resetError } from '../actions/errorActions';
import config from './config';

const fetchOrders = (username, history) => {
 const token = JSON.parse(localStorage.getItem('user')).token;
 return dispatch => {
   dispatch(requestOrders());
   return fetch(config.apiUrl+'/getOrders/'+username, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
   .then(
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
   .then((orders) => {

      // If authentication fails
      if (orders) {
        if (orders.success === false) {
          // DO NOTHING: TODO
        } else {
          // console.log(orders);
          // storing the order list in the local storage
          localStorage.setItem('orders', JSON.stringify(orders));

          dispatch(receiveOrders(orders));
          if (!(Object.keys(orders).length === 0)) {
            history.push('/orders');
          }
        }
      } else throw new Error('no orders received');
   })
  .catch((error) => {
    // console.log('error occurred: ', error.message);
    dispatch(receiveError({
          message: 'error occoured in receiving orders',
          error: error.message,
          show: true
        })
      );
      setTimeout(() => dispatch(resetError()), 6000);
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
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
    .then((order) => {

       // If authentication fails
      if (order.success === false) {
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
    .catch((error) => {
      // console.log('error in adding the new order\n' + e);
      dispatch(receiveError({
          message: 'error in adding the new order',
          error: error.message,
          show: true
        })
      );
      setTimeout(() => dispatch(resetError()), 6000);
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
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
    .then((orderSize) => {

      // If authentication fails
      if (orderSize.success === false) {
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
    .catch((error) => {
      // console.log('error in removing the item' );
      dispatch(receiveError({
          message: 'error in removing the item',
          error: error.message,
          show: true
        })
      );
      setTimeout(() => dispatch(resetError()), 6000);
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
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
    .then((item) => {

       // If authentication fails
      if (item.success === false) {
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
    .catch((error) => {
      // console.log('error in adding the new item ' + itemName);
      dispatch(receiveError({
          message: 'error in adding the item',
          error: error.message,
          show: true
        })
      );
      setTimeout(() => dispatch(resetError()), 6000);
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
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
    .then((item) => {

       // If authentication fails
      if (item.success === false) {
        // DO NOTHING: TODO
      } else {
        // get data from local storage
        let orders = JSON.parse(localStorage.getItem('orders'));
        const i = orders.orderList.findIndex(order => order._id === orderId);
        // index of the item    
        const itemIndx = orders.orderList[i].items.findIndex((item => item.name === itemName));
        // update the item details
        orders.orderList[i].items[itemIndx].count = count;
        // update the local storage
        localStorage.setItem('orders', JSON.stringify(orders));
        dispatch(updateOrders(orders));
      }
    })
    .catch((error) => {
      // console.log('error in adding the new item ' + itemName + '\n' +e);
      dispatch(receiveError({
          message: 'error in updating the item',
          error: error.message,
          show: true
        })
      );
      setTimeout(() => dispatch(resetError()), 6000);
    });
 };
}

const orderService = { fetchOrders, addOrder, removeItem, addItem, updateItem };
export default orderService;