import React from "react";
import { Form, Button, FormControl, FormLabel } from "react-bootstrap";
import "./Home.css";
import { Redirect } from 'react-router-dom'
import {observer} from "controllerim";
import {HomeController} from "../controllers/HomeController"
import { PageComponent } from "./PageComponent";

export const Home = observer(class extends PageComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.controller = new HomeController(this);
        this.controller.mustLogIn()
    }

    render() {
        return ( this.renderRedirect() ||
            <div className="Home">
                
                    <FormLabel>
                    URL:
                    <FormControl id='url' type="text" value={this.controller.state.url} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <FormLabel>
                    Title:
                    <FormControl id='title' type="text" value={this.controller.state.title} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <FormLabel>
                    Description:
                    <FormControl id='description' type="text" value={this.controller.state.description} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <Button variant="primary" type="submit" onClick={this.controller.handleSubmit}>
                        Submit
                    </Button>
                    
            </div>
        );
    }
}
)