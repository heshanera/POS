import { combineReducers } from 'redux';
import orderReducer from './reducerOrders';
import userReducer from './reducerUsers';
import itemReducer from './reducerItems';
import errorReducer from './reducerError';

const reducer = combineReducers({
  userOrders: orderReducer,
  user: userReducer,
  items: itemReducer,
  errors: errorReducer,
});

export default reducer;
