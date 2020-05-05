import {
    USER_LOADING,
    USER_LOADED,
    USER_CREATED
} from './types';
import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/todo/user', tokenConfig(getState))
    .then(user => {
        dispatch({
            type: USER_LOADED,
            payload: user.data
        });
    })
    .catch(err => console.log(err.response.msg));
};

export const createUser = ({ name }) => dispatch => {
    dispatch({ type: USER_LOADING });

    console.log(name + "name");

    axios.post('/api/todo/user/', {name})
    .then(newUser => {
        console.log(newUser.data);
        dispatch({
            type: USER_CREATED,
            payload: newUser.data
        });
    })
    .catch(err => console.log(err.response.msg));
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