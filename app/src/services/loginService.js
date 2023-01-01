import { requestUser, receiveUser } from '../actions/loginActions';
import { receiveError, resetError } from '../actions/errorActions';
import orderService from './orderService';
import itemService from './itemService';
import config from './config';

const fetchUser = (user, history) => {
  const data = `username=${user.username}&password=${user.password}`;

  return (dispatch) => {
    dispatch(requestUser());
    return fetch(`${config.apiUrl}/getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
      .then(
        (response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        },
        (error) => {
          throw new Error(error);
        },
      )
      .then((userData) => {
        if (!(Object.keys(userData).length === 0)) {
          dispatch(receiveUser(userData));
          localStorage.setItem('user', JSON.stringify(userData || ''));
          // loading available items
          dispatch(itemService.fetchAvailableItems());
          // loading the order details
          dispatch(orderService.fetchOrders(userData.username, history));
        }
      })
      .catch((error) => {
        // console.log('invalid username or password: '+ error);
        dispatch(
          receiveError({
            message: 'invalid username or password',
            error: error.message,
            show: true,
          }),
        );
        setTimeout(() => dispatch(resetError()), 6000);
      });
  };
};

const logout = (history) => {
  localStorage.removeItem('user');
  localStorage.removeItem('orders');
  localStorage.removeItem('items');
  return () => {
    history.push('/login');
  };
};

const createOrderList = (user, history, dispatch) => {
  let data = {};
  data.username = user.username;
  data.orderList = [];
  data = JSON.stringify(data);
  return fetch(`${config.apiUrl}/createOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(
      (response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      },
      (error) => {
        throw new Error(error);
      },
    )
    .then((orderList) => {
      if (!(Object.keys(orderList).length === 0)) {
        // redirect to the login
        history.push('/login');
      } else throw new Error('error occurred');
    })
    .catch((error) => {
      dispatch(
        receiveError({
          message: 'error occurred',
          error: error.message,
          show: true,
        }),
      );
      setTimeout(() => dispatch(resetError()), 6000);
    });
};

const register = (user, history) => {
  const data = JSON.stringify(user);
  return (dispatch) =>
    fetch(`${config.apiUrl}/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(
        (response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        },
        (error) => {
          throw new Error(error);
        },
      )
      .then((userData) => {
        if (!(Object.keys(userData).length === 0)) {
          createOrderList(userData, history, dispatch);
        } else throw new Error('error occurred');
      })
      .catch((error) => {
        dispatch(
          receiveError({
            message: 'error occurred',
            error: error.message,
            show: true,
          }),
        );
        setTimeout(() => dispatch(resetError()), 6000);
      });
};

const loginService = { register, fetchUser, logout };
export default loginService;
