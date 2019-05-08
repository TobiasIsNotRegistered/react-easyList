import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
let firebase = require("firebase/app");
require("firebase/auth");

const LoginText = 'Login in will enable you to save and edit lists!'

class LoginFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pwd: '',
            status: LoginText
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.attemptLogin();
        }
    }

    componentDidMount() {
        const _self = this;

        this.setState({
            currentUser: (firebase.auth().currentUser ? firebase.auth().currentUser : null)
        })

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _self.setState({ status: 'logged in as ' + user.email, currentUser: user })
            } else {
                console.log("currentUser : null")
                _self.setState({
                    currentUser: null,
                    status: LoginText
                })
            }
        });
    }

    attemptLogin() {
        const _self = this;
        if (this.state.currentUser) {
            firebase.auth().signOut();
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("ErrorCode: " + errorCode + ", Message: " + errorMessage);
                _self.setState({
                    status: errorMessage
                })
            });
        }
    }

    render() {

        return (
            <div className="LoginFragment">
                <Typography variant="h6">Login</Typography>

                <Typography variant="caption">{this.state.status}</Typography>


                <TextField label="Email" onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={this.handleKeyPress}></TextField>

                <TextField label="Password" onChange={(e) => this.setState({ pwd: e.target.value })} onKeyPress={this.handleKeyPress}></TextField>


                <div className="LoginFragment__Btns">
                    <Button variant="contained" color="secondary" onClick={() => this.props.toggleDrawer()}>Close</Button>
                    <Button variant="contained" color="primary" onClick={() => this.attemptLogin()}>{this.state.currentUser ? 'Logout' : 'Login'}</Button>
                </div>


            </div>
        )
    }
}

export default LoginFragment;