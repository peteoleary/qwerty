import React from "react";
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
            this.getAlert().info('Your email address was confirmed')
        }
    }

    validateForm() {
        return this.controller.state.email.length > 0 && this.controller.state.password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.controller.doLogin(this.controller.state.email, this.controller.state.password).then(() => {
            this.controller.setRedirect ('/')
        }
        ).catch((error) => {
            this.getAlert().error(error.message)
        })
    }

    handleForgotPassword = event => {
        this.controller.setRedirect ('/password_reset' )
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
                                value={this.controller.state.email}
                                onChange={this.controller.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.controller.password}
                                onChange={this.controller.handleChange}
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