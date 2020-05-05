import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addTodo } from '../redux/action/todo';

class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            item: ''
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addTodo = e => {
        e.preventDefault();

        this.setState({ item: '' })
        this.props.addTodo({ item: this.state.item });
    }

    render() {
        return (
            <div>

                { this.props.user.isAuthenticated ? 
                <form class="form-inline mt-3" onSubmit={this.addTodo}>
                    <div class="form-group"style={{ margin: 'auto' }}>
                        <input type="text" class="form-control" placeholder="Add New Todo" value={this.state.item} onChange={this.handleChange} name="item" />
                        <button class="btn btn-primary ml-2" disabled={this.state.item.length > 0 ? false : true}>Add Todo</button>
                    </div>
                </form>
                :
                ''
                }    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { addTodo })(AddTodo);