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

import qs from "stringquery";

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'

export const Signup = observer(class extends Component {

    constructor(props) {
        super(props);

        const obj = qs(props.location.search)

        this.state = {
            is_loading: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            confirmation_code: obj['confirmation_code'] || "",
            redirect: obj['redirect_url'],
            new_user: null
        };
    }

    componentWillMount() {
        this.controller = new SignupController(this);

        if (this.state.confirmation_code) {
            this.handleConfirmationAction(this.state.confirmation_code)
        }
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.password_confirmation
        );
    }

    validateConfirmationForm() {
        return this.state.confirmation_code.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ is_loading: true });

        this.controller.doSignup(this.state).then((user) => {

            this.setState({ new_user: user });

            this.setState({ is_loading: false });
        }).catch((error) => {

            Alert.error(error.message)
            this.setState({ is_loading: false });
        })
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.handleConfirmationAction(this.state.confirmation_code)
    }

    handleConfirmationAction(confirmation_code) {
        this.setState({ is_loading: true });
        this.controller.doConfirmation(confirmation_code).then(() => {
            this.setState({ is_loading: false });

            this.setState({redirect: '/login?did_confirm=true'})

        }).catch ((message) => {
            Alert.error(message.message)
            this.setState({ is_loading: false });
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