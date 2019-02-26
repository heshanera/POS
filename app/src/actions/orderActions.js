export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

export const requestOrders = () => ({
    type: 'REQUEST_ORDERS',    
});

export const receiveOrders = orders => ({
    type: 'RECEIVE_ORDERS',    
    payload: orders
});

export const updateOrders = orders => ({
    type: 'UPDATE_ORDERS',    
    payload: orders
});