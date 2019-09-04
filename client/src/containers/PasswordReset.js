import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import {observer} from "controllerim";
import {PasswordResetController} from "../controllers/PasswordResetController";

export const PasswordReset = observer(class extends Component {

        constructor(props) {
            super(props);

            this.state = {
            };
        }

        componentWillMount() {
            this.controller = new PasswordResetController(this);
        }

        validateForm() {
            return this.state.email.length > 0;
        }

        handleChange = event => {
            this.setState({
                [event.target.id]: event.target.value
            });
        }

        handleSubmit = event => {
            event.preventDefault();
            // TODO: handle password reset here
        }

        render() {
            return (
                <div className="PasswordReset">
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