import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./PasswordReset.css";
import {observer} from "controllerim";
import {PasswordResetController} from "../controllers/PasswordResetController";
import { PageComponent } from "./PageComponent";

export const PasswordReset = observer(class extends PageComponent {

        constructor(props) {
            super(props);
        }

        componentWillMount() {
            this.controller = new PasswordResetController(this);
        }

        render() {
            return (
                <div className="PasswordReset">
                    <form onSubmit={this.controller.handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.controller.state.email}
                                onChange={this.controller.controller.handleChange}
                            />
                        </FormGroup>
                        <Button
                            block
                            disabled={!this.controller.validateForm()}
                            type="submit"
                        >
                            Send Password Reset Email
                        </Button>
                    </form>
                </div>
            );
        }
    }
)