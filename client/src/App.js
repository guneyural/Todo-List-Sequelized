import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './redux/action/user';
import Profile from './components/profile';
import Todo from './components/todo';
import AddTodo from './components/addTodo';
import store from './redux';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div>
        <Provider store={ store }>
          <Profile />
          <AddTodo />
          <Todo />
        </Provider>
      </div>
    );
  }
}

export default App;