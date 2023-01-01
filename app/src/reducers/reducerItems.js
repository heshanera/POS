import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../actions/itemActions';

// loading data from the local storage
// let savedState = JSON.parse(localStorage.getItem('items')) || [];

export const getSavedState = () => {
  const data = localStorage.getItem('items') || '[]';
  return JSON.parse(data);
};

const items = (
  // default values for the state loaded from local storage
  // eslint-disable-next-line default-param-last
  state = getSavedState(),
  action,
) => {
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
