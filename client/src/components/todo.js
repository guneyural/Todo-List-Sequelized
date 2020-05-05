import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTodos, updatedTodo, deleteTodo } from '../redux/action/todo';
import EditTodo from '../components/editTodo';

class Todo extends Component {
    constructor() {
        super();

        this.state = {
            count : 1,
            name: '',
            id: ''
        };
    }

    componentDidMount() {
        this.props.loadTodos();
    }

    clicked = (name, id) => {
        const count = this.state.count;
        console.log(name + id);
        this.setState({
            count: count + 1,
            name: name,
            id: id
        });
        console.log(this.state);
    }

    deleteItem = id => {
        this.props.deleteTodo({id});
    }

    render() {
        const { todo } = this.props;
        let allTodos, isEmpty;
        if(typeof todo !== "undefined") {
            if(todo.todos.length<1){
                isEmpty = true;
            }
            allTodos = todo.todos.map(item => {
                return (
                    <div class="mt-2 container" key={item.id} style={{ fontSize: '23px' }}>
                        <div class="row">
                            <div class="col-md-3 col-sm-4 col-xs-12 text-success" style={{ paddingLeft: '10px' }}>
                                <span style={{ paddingLeft: '15px' }}>{ item.user.name }</span>
                            </div>
                            <div class="col-md-6 col-sm-4 col-xs-12">
                                <span style={{ paddingLeft: '10px' }}>{ item.item }</span>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-12">
                                <span type="button" class="btn text-warning" style={{ fontSize: '20px' }} onClick={this.clicked.bind(this, item.item, item.id)}>Edit</span>
                                <span type="button" class="btn text-danger" style={{ fontSize: '20px' }} onClick={this.deleteItem.bind(this, item.id)}>Delete</span>
                            </div>
                        </div>
                    </div>
                )
            });
        }

        return (
            <div class="container mt-5">
                { this.props.user.isAuthenticated ? todo.isLoading ? 'Loading...' : 
                <div>

                    { isEmpty ? 'Add Todo...' : allTodos }
                    { this.state.count % 2 === 0 ? <EditTodo 
                    item={this.state.name}
                    id={this.state.id}
                    />
                    :
                    ''
                    }
                </div>
                
                : 'Login To Add And See Todo' }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        todo: state.todo
    }
}

export default connect(mapStateToProps, { loadTodos, updatedTodo, deleteTodo })(Todo);