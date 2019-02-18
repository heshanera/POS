import {requestUser, receiveUser } from '../actions/loginActions';
import orderService from './orderService';
import itemService from './itemService';
import config from './config';

const fetchUser = (user, history) => {
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
      console.log(user);
      dispatch(receiveUser(user));
      if (!(Object.keys(user).length === 0)) {
        localStorage.setItem('user', JSON.stringify(user));
        // loading the order details
        dispatch(orderService.fetchOrders(user.username, history));
        // loading available items
        dispatch(itemService.fetchAvailableItems());
      }
   },
  )
  .catch((e) => {
    console.log('invalid username or password');
   }
  );
 };
}

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('orders');
  window.location.reload();
}

const loginService = { fetchUser, logout };
export default loginService;