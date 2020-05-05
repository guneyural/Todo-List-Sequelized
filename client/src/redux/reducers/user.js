import {
    USER_LOADING,
    USER_LOADED,
    USER_CREATED
} from '../action/types';

const initialState = {
    userId: localStorage.getItem('userId'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                userId: localStorage.getItem('userId'),
                isAuthenticated: true,
                isLoading: false,
                user: {
                    name: action.payload.name
                }
            }
        case USER_CREATED:
            localStorage.setItem('userId', action.payload.id);
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.id,
                user: { 
                    name: action.payload.name
                }
            }
        default:
            return state
    }
}