import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../actions/itemActions';

// loading data from the local storage
const savedState = JSON.parse(localStorage.getItem('items'))
let availableItems = []
if (savedState != null) {
  availableItems = savedState
};

const items = (
  // default values for the state loaded from local storage
  state = availableItems, 
  action) => {

  switch (action.type) {
    case REQUEST_ITEMS:
      return state;
    case RECEIVE_ITEMS:
      return action.payload;
    default:
       return state;
  }
};
export default items;
