import { combineReducers } from 'redux';
import todoReducer from './todo';
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
});

export default rootReducer;