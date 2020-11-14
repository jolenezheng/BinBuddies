import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import './App.css';
// import { createBrowserHistory as history } from 'history';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
        <div className="App">
              <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              </Switch>
        </div>
    </Router>
  );
}

export default App;
