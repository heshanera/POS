import { REQUEST_USER, RECEIVE_USER } from '../actions/loginActions';

export const getSavedState = () => {
  const data = localStorage.getItem('user') || '{}';
  return JSON.parse(data);
};

const user = (
  // default values for the state loaded from local storage
  // eslint-disable-next-line default-param-last
  state = getSavedState(),
  action,
) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loading: false,
      };
    default:
      return state;
  }
};
export default user;
