import React, { Component } from "react";
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

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'

export const Signup = observer(class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            confirmationCode: "",
            newUser: null
        };
    }

    componentWillMount() {
        this.controller = new SignupController(this);
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.password_confirmation
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        this.controller.do_signup(this.state).then((user) => {

            this.setState({ newUser: user });

            this.setState({ isLoading: false });
        }).catch((message) => {

            Alert.error(message.message)
            this.setState({ isLoading: false });
        })
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                    />
                    <FormText>Please check your email for the code.</FormText>
                </FormGroup>
                <LoaderButton
                    block
                    disabled={!this.validateConfirmationForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
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
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up…"
                />
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}
)