import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/nav/Navbar';
import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/profile/CreateProfile';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';

import Lessons from './components/lessons/Lessons';
import AddLesson from './components/lessons/lessonBuilder/AddLesson';
import EditLesson from './components/lessons/lessonBuilder/EditLesson';
import Lesson from './components/lessons/lessonContent/Lesson';

import Courses from './components/courses/Courses';
import AddCourse from './components/courses/courseBuilder/AddCourse';
import EditCourse from './components/courses/courseBuilder/EditCourse';
import Course from './components/courses/courseContent/Course';

import MyCreatedContent from './components/profile/myCreatedContent/MyCreatedContent';
import MyCompleted from './components/profile/myCompletedContent/MyCompleted';
import ViewUserContent from './components/profile/ViewUserContent';

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
          <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div id="App">
              <Navbar />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
                <div id="page-wrap">
                <div className="ui container">

                <Switch><PrivateRoute exact path="/dashboard" component={Dashboard} /></Switch>
                <Switch><PrivateRoute exact path="/create-profile" component={CreateProfile} /></Switch>
                <Switch><PrivateRoute exact path="/profile/:handle" component={Profile} /></Switch>
                <Switch><PrivateRoute exact path="/profile/:handle/edit" component={EditProfile} /></Switch>
                <Switch><PrivateRoute exact path="/lessons" component={Lessons} /></Switch>
                <Switch><PrivateRoute exact path="/lessons/new" component={AddLesson} /></Switch>
                <Switch><PrivateRoute exact path="/lesson/:id/edit" component={EditLesson} /></Switch>
                <Switch><PrivateRoute exact path="/lesson/:id" component={Lesson} /></Switch>
                <Switch><PrivateRoute exact path="/courses" component={Courses} /></Switch>
                <Switch><PrivateRoute exact path="/courses/new" component={AddCourse} /></Switch>
                <Switch><PrivateRoute exact path="/course/:id" component={Course} /></Switch>
                <Switch><PrivateRoute exact path="/course/:id/edit" component={EditCourse} /></Switch>
                <Switch><PrivateRoute exact path="/mycontent" component={MyCreatedContent} /></Switch>
                <Switch><PrivateRoute exact path="/mycompleted" component={MyCompleted} /></Switch>
                <Switch><PrivateRoute exact path="/profile/:handle/created-content" component={ViewUserContent} /></Switch>
              </div>
              </div>
            </div>
          </Router>
          </PersistGate>
        </Provider>
      );
    }
}

export default App;
