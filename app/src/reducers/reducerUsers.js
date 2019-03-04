import { REQUEST_USER, RECEIVE_USER } from '../actions/loginActions';

// loading data from the local storage
// const savedState = JSON.parse(localStorage.getItem('user')) || {};

// let userDetails = {}
// if (savedState != null) {
//   userDetails = {
//     username:savedState.username,
//     firstName:savedState.firstName,
//     lastName:savedState.lastName
//   }
// };

export const getSavedState = () => {
  let data = (localStorage.getItem('user') || '{}');
  return JSON.parse(data);
}

const user = (
  // default values for the state loaded from local storage
  state = getSavedState(), action) => {

  switch (action.type) {
    case REQUEST_USER:
       return { 
       	...state, 
       	loading: true 
       };
    case RECEIVE_USER:
       return { 
       	...state, 
       	firstName: action.payload.firstName,
       	lastName: action.payload.lastName, 
       	loading: false 
       };
    default:
       return state;
  }
};
export default user;