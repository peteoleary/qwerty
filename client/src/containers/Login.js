import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import {observer} from "controllerim";
import {LoginController} from "../controllers/LoginController"
import { PageComponent } from "./PageComponent";

export const Login = observer(class extends PageComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.controller = new LoginController(this);

        if (this.controller.state.did_confirm) {
            this.getAlert.info('Your email address was confirmed')
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.controller.doLogin(this.state.email, this.state.password).then(() => {
            this.controller.state({redirect: '/home'})
        }
        ).catch((error) => {
            this.getAlert.error(error.message)
        })
    }

    handleForgotPassword = event => {
        this.controller.state.redirect = '/password_reset'
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
                        <Button variant="link" onClick={this.handleForgotPassword}>Forgot Password</Button>
                    </form>
            </div>
        );
    }
}
)