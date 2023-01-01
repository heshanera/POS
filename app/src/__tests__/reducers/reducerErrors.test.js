import reducer from '../../reducers/reducerError';
import * as errorActions from '../../actions/errorActions';

describe('Error reducer', () => {
  it('should return the initial state', () => {
    const data = { message: '', error: '', show: false };
    expect(reducer(undefined, {})).toEqual(data);
  });

  it('should handle RECEIVE_ERROR', () => {
    const newError = {
      message: 'Error occoured: url not found',
    };
    expect(reducer({}, { type: errorActions.RECEIVE_ERROR, payload: {} })).toEqual({});
    expect(reducer({}, { type: errorActions.RECEIVE_ERROR, payload: newError })).toEqual(newError);
  });

  it('should handle RESET_ERROR', () => {
    const error = {
      message: 'Error occoured: url not found',
    };
    expect(reducer(error, { type: errorActions.RESET_ERROR, payload: {} })).toEqual(error);
  });
});
