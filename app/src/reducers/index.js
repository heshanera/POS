import {combineReducers} from 'redux';
import orderReducer from './reducerOrders';
import userReducer from './reducerUsers';
import itemReducer from './reducerItems';

const reducer = combineReducers({
	userOrders: orderReducer,
	user: userReducer,
	items: itemReducer,
});

export default reducer;