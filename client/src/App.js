import React from 'react'
import logo from './logo.svg'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import {Login} from "./containers/Login"
import {Signup} from "./containers/Signup"
import {Header} from "./containers/Header"
import {PasswordReset} from "./containers/PasswordReset"
import {Home} from "./containers/Home"

import { observer } from 'controllerim'

import { AppController } from './AppController';

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'

export const App = observer(class extends React.Component {

  constructor(props) {
    super(props);
  }

    componentWillMount() {
        this.controller = new AppController(this);
    }

    render() {
      return (
          <Router>
            <div>
              <Header />

              <Alert stack={{limit: 3}} />

              <Route exact path="/" component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/password_reset" component={PasswordReset} />
                <Route path="/about" component={About} />
            </div>
          </Router>
      );
    }
})

function About() {
  return <h2>About</h2>;
}
export default App;