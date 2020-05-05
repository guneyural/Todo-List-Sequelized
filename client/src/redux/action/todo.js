import {
    TODO_LOADING,
    TODO_LOADED,
    TODO_ADDED,
    TODO_UPDATED,
    TODO_DELETED
} from './types';
import axios from 'axios';

export const loadTodos = () => (dispatch, getState) => {
    dispatch({ type: TODO_LOADING });

    axios.get('/api/todo', tokenConfig(getState))
    .then(todos => {
        dispatch({
            type: TODO_LOADED,
            payload: todos.data
        });
    })
    .catch(err => console.log(err.response.msg));
};

export const addTodo = ({item}) => (dispatch, getState) => {
    dispatch({ type: TODO_LOADING });

    axios.post('/api/todo', {item}, tokenConfig(getState))
    .then(todo => {
        dispatch({
            type: TODO_ADDED,
            payload: todo.data
        });
    })
    .catch(err => console.log(err.response.msg));
};

export const updatedTodo = ({id, item}) => (dispatch, getState) => {
    dispatch({ type: TODO_LOADING }); //put request /api/post/:id

    axios.put(`/api/todo/${id}`, {item}, tokenConfig(getState))
    .then(updatedTodo => {
        dispatch({
            type: TODO_UPDATED,
            payload: updatedTodo.data
        });
    })
    .catch(err => console.log(err.response.msg));
};

export const deleteTodo = ({id}) => (dispatch, getState) => {
    dispatch({ type: TODO_LOADING }); // delete request /api/post/:id

    axios.delete(`/api/todo/${id}`, tokenConfig(getState))
    .then(deletedTodo => {
        dispatch({
            type: TODO_DELETED,
            payload: {id}
        });
    })
    //.catch(err => console.log(err.response.msg));
};

const tokenConfig = getState => {
    const token = getState().user.userId;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(token) config.headers["userId"] = token;

    return config;
}