import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { Redirect } from 'react-router-dom'
import {observer} from "controllerim";
import {LoginController} from "../controllers/LoginController"

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'

import qs from "stringquery";

export const Login = observer(class extends Component {

    constructor(props) {
        super(props);

        const obj = qs(props.location.search)

        this.state = {
            email: "",
            password: "",
            did_confirm: obj['did_confirm'],
            redirect: null
        };

    }

    componentWillMount() {
        this.controller = new LoginController(this);

        if (this.state.did_confirm) {
            Alert.info('Your email address was confirmed')
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.controller.doLogin(this.state.email, this.state.password).then(() => {
            this.setState({redirect: '/home'})
        }
        ).catch((error) => {
            Alert.error(error.message)
        })
    }

    renderRedirect(){
        return this.state.redirect ? <Redirect to={this.state.redirect} /> : null
      }

    render() {
        return ( this.renderRedirect() ||
            <div className="Login">
                
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
            </div>
        );
    }
}
)