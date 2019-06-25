import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';


class App extends Component {
  render() {
      return (
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </Router>
        </Provider>
      );
    }
}

export default App;
