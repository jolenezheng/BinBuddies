import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import history from './history';
import './App.css';
// import { createBrowserHistory as history } from 'history';
import Login from './Login';
import Home, {FinalResult} from './Home';
import ImageRecognition from './ImageRecognition'

function App() {
  return (
    <Router history={history}>
        <div className="App">
              <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/final" component={FinalResult} />
              <Route path="/testAPI" component={ImageRecognition} />
              </Switch>
        </div>
    </Router>
  );
}

export default App;
