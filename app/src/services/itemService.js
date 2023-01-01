import { requestItems, receiveItems } from '../actions/itemActions';
import { receiveError, resetError } from '../actions/errorActions';
import config from './config';

const fetchAvailableItems = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    dispatch(requestItems());
    return fetch(`${config.apiUrl}/getItems`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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
      .then((items) => {
        if (items.success === false) {
          // DO NOTHING: TODO
        } else {
          // storing the item list in the local storage
          localStorage.setItem('items', JSON.stringify(items));
          dispatch(receiveItems(items));
        }
      })
      .catch((error) => {
        // console.log('error occurred');
        dispatch(
          receiveError({
            message: 'error occoured in receiving items',
            error: error.message,
            show: true,
          }),
        );
        setTimeout(() => dispatch(resetError()), 6000);
      });
  };
};

const itemService = { fetchAvailableItems };
export default itemService;
