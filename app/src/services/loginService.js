import { requestUser, receiveUser } from '../actions/loginActions';
import { receiveError, resetError } from '../actions/errorActions';
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
      response => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
      },
      error => { new Error('an error occoured')}
    )
   .then((user) => {
      if (!(Object.keys(user).length === 0)) {
        dispatch(receiveUser(user));
        localStorage.setItem('user', JSON.stringify(user));
        // loading available items
        dispatch(itemService.fetchAvailableItems());
        // loading the order details
        dispatch(orderService.fetchOrders(user.username, history));
      }
   })
  .catch((error) => {
    // console.log('invalid username or password: '+ error);
    dispatch(receiveError({
        message: 'invalid username or password',
        error: error.message,
        show: true
      })
    );
    setTimeout(() => dispatch(resetError()), 6000);
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