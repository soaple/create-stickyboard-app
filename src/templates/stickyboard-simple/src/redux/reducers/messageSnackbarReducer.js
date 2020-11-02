// src/redux/reducers/messageSnackbarReducer.js

import { SHOW_MESSAGE_SNACKBAR, HIDE_MESSAGE_SNACKBAR } from 'redux/actions';

const initialState = {
    open: false,
    message: 'Loading...',
};

function messageSnackbarReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MESSAGE_SNACKBAR:
            const message = action.message || state.message;

            return {
                ...state,
                open: action.open,
                message: message,
            };
        case HIDE_MESSAGE_SNACKBAR:
            return {
                ...state,
                open: action.open,
            };
        default:
            return state;
    }
}

export default messageSnackbarReducer;
