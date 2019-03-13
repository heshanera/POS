export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const RESET_ERROR = 'RESET_ERROR'

export const receiveError = error => ({
    type: 'RECEIVE_ERROR',    
    payload: error
});

export const resetError = () => ({
    type: 'RESET_ERROR',    
    payload: { message: '', error:'', show: false }
});
