import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/nav/Navbar';
import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/profile/CreateProfile';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';

import Lessons from './components/lessons/Lessons';
import AddLesson from './components/lessons/lessonBuilder/AddLesson';


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
                <Switch><PrivateRoute exact path="/dashboard" component={Dashboard} /></Switch>
                <Switch><PrivateRoute exact path="/profile/create" component={CreateProfile} /></Switch>
                <Switch><PrivateRoute exact path="/profile/:handle" component={Profile} /></Switch>
                <Switch><PrivateRoute exact path="/profile/:handle/edit" component={EditProfile} /></Switch>
                <Switch><PrivateRoute exact path="/lessons" component={Lessons} /></Switch>
                <Switch><PrivateRoute exact path="/lessons/new" component={AddLesson} /></Switch>
              </div>
              </div>
            </div>
          </Router>
        </Provider>
      );
    }
}

export default App;
