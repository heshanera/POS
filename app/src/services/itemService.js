import { requestItems, receiveItems, updateItems } from '../actions/itemActions';
import config from './config';

const fetchAvailableItems = () => {
  return dispatch => {
    dispatch(requestItems());
    return fetch(config.apiUrl+'/getItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ''
    })
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((items) => {
      console.log(items);
      // storing the item list in the local storage
      localStorage.setItem('items', JSON.stringify(items));
      dispatch(receiveItems(items));
   },
  )
  .catch((e) => {
    console.log('error occurred');
   }
  );
 };
}


const itemService = { fetchAvailableItems };
export default itemService;