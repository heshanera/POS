import { requestItems, receiveItems, updateItems } from '../actions/itemActions';
import config from './config';

const fetchAvailableItems = () => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    dispatch(requestItems());
    return fetch(config.apiUrl+'/getItems', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ''
    })
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((items) => {

      // If authentication fails
      if (items.success == false) {
        // DO NOTHING: TODO
      } else {
        // storing the item list in the local storage
        localStorage.setItem('items', JSON.stringify(items));
        dispatch(receiveItems(items));
      }
      
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