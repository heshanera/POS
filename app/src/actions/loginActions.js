export const GET_USER = 'GET_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';


export const requestUser = () => ({
    type: 'REQUEST_USER',    
});

export const receiveUser = user => ({
    type: 'RECEIVE_USER',    
    payload: user
});

// export const loggedIn = loggedIn => ({
// 	type: 'LOGGED_IN',
// 	payload: loggedIn
// });

