import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
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

        // TODO: move this logic to a concern for Components which require authentication
        this.controller.isLoggedIn().then((logged_in) => {
            if (!logged_in) {
                this.controller.state.redirect = '/login'
            }
        })
        
    }

    render() {
        return ( this.renderRedirect() ||
            <div className="Home">
                
                Put stuff here
                    
            </div>
        );
    }
}
)