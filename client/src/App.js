import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/nav/Navbar';
import Dashboard from './components/dashboard/Dashboard';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
}

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
