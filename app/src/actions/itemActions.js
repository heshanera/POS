export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_ITEMS = 'UPDATE_ITEMS';

export const requestItems = () => ({
    type: 'REQUEST_ITEMS',    
});

export const receiveItems = items => ({
    type: 'RECEIVE_ITEMS',    
    payload: items
});
