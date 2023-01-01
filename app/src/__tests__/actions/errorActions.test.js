import * as errorActions from '../../actions/errorActions';

describe('Error actions', () => {
  it('should receive errors', () => {
    const error = {
      error: 'this is an error',
    };
    const expectedAction = {
      type: errorActions.RECEIVE_ERROR,
      payload: error,
    };
    expect(errorActions.receiveError(error)).toEqual(expectedAction);
  });
});
