import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../redux/action/user';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = e => {
        e.preventDefault();
        
        this.props.createUser({ name: this.state.name });
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                { typeof user === "undefined" ? '': 
                
                    <div>
                        { user.isAuthenticated ? 
                            <div class="bg-dark text-light text-center" style={{ fontSize: '30px' }}>
                                Current User: { user.user.name }
                            </div>
                        : 
                        
                        <div class="bg-dark text-light text-center" style={{ fontSize: '30px', padding: '20px' }}>
                            <form class="form-inline" onSubmit={this.login}>
                                <div class="form-group" style={{ margin: "auto" }}>
                                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} class="form-control" placeholder="name" />
                                    <button style={{ fontSize: '15px', borderRadius: '2%' }} class="btn btn-primary ml-2">Create User</button>
                                </div>
                            </form>
                        </div>
                        
                        }
                    </div>
                
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

export default connect(mapStateToProps, { createUser })(Profile);