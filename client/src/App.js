import React from 'react'
import logo from './logo.svg'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import {Login} from "./containers/Login"
import {Signup} from "./containers/Signup"
import {Header} from "./containers/Header"
import {PasswordReset} from "./containers/PasswordReset"

import { observer } from 'controllerim'

import { AppController } from './AppController';

export const App = observer(class extends React.Component {
    componentWillMount() {
        this.controller = new AppController(this);
    }

    render() {
      return (
          <Router>
            <div>
              <Header />

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

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
export default App;