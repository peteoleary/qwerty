import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import {
    FormText,
    FormGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

import {observer} from "controllerim"
import {SignupController} from "../controllers/SignupController"
import { PageComponent } from "./PageComponent";


export const Signup = observer(class extends PageComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.controller = new SignupController(this);

        if (this.controller.state.confirmation_code) {
            this.handleConfirmationAction(this.state.confirmation_code)
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.controller.state.is_loading = true

        this.controller.doSignup(this.state).then((user) => {

            this.controller.statenew_user = user

            this.controller.state.is_loading = false
        }).catch((error) => {

            this.getAlert().error(error.message)
            this.controller.state.is_loading = false
        })
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.handleConfirmationAction(this.state.confirmation_code)
    }

    handleConfirmationAction(confirmation_code) {
        this.controller.state. is_loading = true
        this.controller.doConfirmation(confirmation_code).then(() => {
            this.controller.state.is_loading = false

            this.controller.state.redirect = '/login?did_confirm=true'

        }).catch ((message) => {
            this.getAlert().error(message.message)
            this.controller.state.is_loading = false
        })
    }

    renderRedirect(){
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
      }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmation_code">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={this.state.confirmation_code}
                        onChange={this.handleChange}
                    />
                    <FormText>Please check your email for the code.</FormText>
                </FormGroup>
                <LoaderButton
                    block
                    disabled={!this.validateConfirmationForm()}
                    type="submit"
                    isLoading={this.state.is_loading}
                    text="Verify"
                    loadingText="Verifying…"
                />
            </form>
        );
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="first_name">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="last_name">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="string"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
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
                <FormGroup controlId="password_confirmation">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.is_loading}
                    text="Signup"
                    loadingText="Signing up…"
                />
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.redirect ? this.renderRedirect() : 
                    this.state.new_user === null
                        ? this.renderForm()
                        : this.renderConfirmationForm()}
            </div>
        );
    }
}
)