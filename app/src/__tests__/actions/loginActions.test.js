import * as loginActions from '../../actions/loginActions';

describe('Item actions', () => {
  it('should request user details', () => {
    const expectedAction = {
      type: loginActions.REQUEST_USER,
    };
    expect(loginActions.requestUser()).toEqual(expectedAction);
  });

  it('should receive user details', () => {
    const user = {
      username: 'johns',
      firstName: 'John',
      lastName: 'Smith',
    };
    const expectedAction = {
      type: loginActions.RECEIVE_USER,
      payload: user,
    };
    expect(loginActions.receiveUser(user)).toEqual(expectedAction);
  });
});
