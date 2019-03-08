import {requestUser, receiveUser } from '../actions/loginActions';
import orderService from './orderService';
import itemService from './itemService';
import config from './config';
import { createBrowserHistory } from 'history';

const serviceData = {};

const fetchUser = (user, history) => {
 serviceData.history = history;
 const data = "username="+user.username+"&password="+user.password;
 return dispatch => {
   dispatch(requestUser());
   return fetch(config.apiUrl+'/getUser', {
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
   .then((user) => {
      // console.log(user)
      dispatch(receiveUser(user));
      if (!(Object.keys(user).length === 0)) {
        localStorage.setItem('user', JSON.stringify(user));
        // loading available items
        dispatch(itemService.fetchAvailableItems());
        // loading the order details
        dispatch(orderService.fetchOrders(user.username, history));
      }
   },
  )
  .catch((e) => {
    console.log('invalid username or password');
   }
  );
 };
}

const logout = (history) => {
  localStorage.removeItem('user');
  localStorage.removeItem('orders');
  localStorage.removeItem('items');
  return dispatch => {
    history.push('/login');
  }
  
}

const loginService = { serviceData, fetchUser, logout };
export default loginService;