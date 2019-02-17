import { REQUEST_ORDERS, RECEIVE_ORDERS, UPDATE_ORDERS } from '../actions/orderActions';

// loading data from the local storage
const savedState = JSON.parse(localStorage.getItem('orders'))
let orderDetails = {}
if (savedState != null) {
  orderDetails = {
    orderList:savedState.orderList
  }
};

const orders = (
  // default values for the state loaded from local storage
  state = orderDetails, action) => {

  switch (action.type) {
    case REQUEST_ORDERS:
      return { 
       	...state, 
       	loading: true 
      };
    case RECEIVE_ORDERS:
      return { 
       	...state, 
       	orderList: action.payload.orderList,
       	loading: false 
      };
    case UPDATE_ORDERS:
      return {
        ...state, 
        orderList: action.payload.orderList,
        loading: false
      }
    default:
       return state;
  }
};
export default orders;