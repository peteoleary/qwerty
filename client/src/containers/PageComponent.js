import React, { Component } from "react";
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import { Redirect } from 'react-router-dom'
import qs from "stringquery"

export class  PageComponent extends Component {

    constructor(props) {
        super(props)
        this.query_params = qs(props.location.search)
    }

    renderRedirect(){
        return this.controller.state.internal_redirect ? <Redirect to={this.controller.state.internal_redirect} /> : null
      }

    getAlert() {
        return Alert
    }
}
