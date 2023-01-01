import { REQUEST_ORDERS, RECEIVE_ORDERS, UPDATE_ORDERS } from '../actions/orderActions';

// let savedState = JSON.parse(localStorage.getItem('orders')) || {};

export const getSavedState = () => {
  const data = localStorage.getItem('orders') || '{}';
  return JSON.parse(data);
};

const orders = (
  // default values for the state loaded from local storage
  // eslint-disable-next-line default-param-last
  state = getSavedState(),
  action,
) => {
  switch (action.type) {
    case REQUEST_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_ORDERS:
      return {
        ...state,
        orderList: action.payload.orderList,
        loading: false,
      };
    case UPDATE_ORDERS:
      return {
        ...state,
        orderList: action.payload.orderList,
        loading: false,
      };
    default:
      return state;
  }
};
export default orders;
