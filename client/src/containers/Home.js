import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Home.css";
import { Redirect } from 'react-router-dom'
import {observer} from "controllerim";
import {HomeController} from "../controllers/HomeController"

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'

import qs from "stringquery";

export const Home = observer(class extends Component {

    constructor(props) {
        super(props);

        const obj = qs(props.location.search)

        this.state = {
            redirect: null
        };

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

    renderRedirect(){
        return this.state.redirect ? <Redirect to={this.state.redirect} /> : null
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