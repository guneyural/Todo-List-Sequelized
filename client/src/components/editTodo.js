import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatedTodo } from '../redux/action/todo';

class editTodo extends Component {
    constructor() {
        super();

        this.state = {
            item: ''
        };
    }

    componentDidMount() {
        this.setState({
            item: this.props.item
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editTodo = e => {
        e.preventDefault();

        this.props.updatedTodo({
            id: this.props.id,
            item: this.state.item
        });

        setTimeout(() => {
            window.location.replace(window.location.origin);
        }, 400);
    }

    render() {
        return (
            <div>
                <form class="form-inline mt-3" onSubmit={this.editTodo}>
                    <div class="form-group"style={{ margin: 'auto' }}>
                        <input type="text" class="form-control" defaultValue={this.state.title} placeholder="Update Todo" value={this.state.item} onChange={this.handleChange} name="item" />
                        <button class="btn btn-primary ml-2" disabled={this.state.item.length > 0 ? false : true}>Add Todo</button>
                    </div>
                </form>     
            </div>
        )
    }
}

export default connect(null, { updatedTodo })(editTodo);