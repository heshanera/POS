import { RECEIVE_ERROR, RESET_ERROR } from '../actions/errorActions';

const errors = ( state = { message: '', error:'', show: false }, action) => {
  switch (action.type) {
    case RECEIVE_ERROR:
      return action.payload;
    case RESET_ERROR:
      action.payload.message = state.message;
      action.payload.error = state.error;	
      return action.payload;
    default:
       return state;
  }
};

export default errors;
