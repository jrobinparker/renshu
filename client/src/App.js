import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/nav/Navbar';
import Dashboard from './components/dashboard/Dashboard';


class App extends Component {
  render() {
      return (
        <Provider store={store}>
          <Router>
            <div id="App">
              <Navbar />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
                <div id="page-wrap">
                <div className="ui container">
                <Route exact path="/dashboard" component={Dashboard} />
              </div>
              </div>
            </div>
          </Router>
        </Provider>
      );
    }
}

export default App;
