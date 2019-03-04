import reducer from '../../reducers/reducerUsers'
import * as loginActions from '../../actions/loginActions'

describe('User reducer', () => {
	let user;
	beforeAll(() => {
		user = {
			firstName: 'John',
			lastName: 'Smith'
		}
	})

	it('should return the initial state', () => {
	    const data = {};
	    expect(reducer(undefined, {})).toEqual(data);
  	});

	it('should handle REQUEST_USER', () => {
	    expect(reducer({}, { type: loginActions.REQUEST_USER }) ).toEqual({loading: true});
	    expect(reducer(user, { type: loginActions.REQUEST_USER })).toEqual({...user, loading: true});
	});

	it('should handle RECEIVE_USER', () => {
		const newUser = {
			firstName: 'john',
			lastName: 'Doe',
		}
	    expect(reducer([], { type: loginActions.RECEIVE_USER, payload: user }) ).toEqual({...user, loading: false})
	    expect(reducer(user, { type: loginActions.RECEIVE_USER, payload: newUser })).toEqual({...newUser, loading: false});
	});	

});