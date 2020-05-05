import {
    TODO_LOADING,
    TODO_LOADED,
    TODO_ADDED,
    TODO_UPDATED,
    TODO_DELETED
} from '../action/types';

const initialState = {
    todos: [],
    isLoading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case TODO_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case TODO_LOADED:
            return {
                ...state,
                isLoading: false,
                todos: action.payload
            }
        case TODO_ADDED:
            return {
                ...state,
                isLoading: false,
                todos: [action.payload, ...state.todos]
            }
        case TODO_UPDATED:
            return {
                ...state,
                isLoading: false,
                todos: [...state.todos.map(item => item.id === action.payload.id ? action.payload : item)]
            }
        case TODO_DELETED:
            return {
                ...state,
                isLoading: false,
                todos: [...state.todos.filter( item => item.id !== action.payload.id )]
            }
        default: 
            return state
    }
}