import React from 'react';
import { TextField, Typography, Button, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

let firebase = require("firebase/app");
require("firebase/auth");

const LoginText = 'Wenn igloggt bisch chasch dini Listä speichere und uf allne Browser nutze :)'

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
                _self.setState({ status: 'igloggt mit email: ' + user.email, currentUser: user })
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

    attemptRegister() {
        const _self = this;

        if (this.state.currentUser) {
            return;
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
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

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

    render() {

        return (
            <div className="LoginFragment">
                <Typography variant="h6">Login/Registrierä</Typography>

                <Typography variant="caption">{this.state.status}</Typography>

                <TextField label="Email" onChange={(e) => this.setState({ email: e.target.value })} onKeyPress={this.handleKeyPress}></TextField>
                
                <FormControl >
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={(e) => this.setState({ pwd: e.target.value })}
                        onKeyDown={(event) => this.handleKeyPress(event)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>


                <div className="LoginFragment__Btns">
                    <Button variant="contained" color="primary" onClick={() => this.attemptLogin()}>{this.state.currentUser ? 'Uslogge' : 'Ilogge'}</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.attemptRegister()}>Registrierä</Button>
                    <Button variant="contained" color="default" onClick={() => this.props.toggleDrawer()}>Zrugg</Button>
                </div>

                <br />
            </div>
        )
    }
}

export default LoginFragment;