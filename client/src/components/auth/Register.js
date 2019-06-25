import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state
    let errorTextName, errorTextEmail, errorTextPassword, errorTextPassword2

    if (errors.name) {
      errorTextName = (
        <div class="ui error message">
          <div class="header">{errors.name}</div>
        </div>
      )
    }

    if (errors.email) {
      errorTextEmail = (
        <div class="ui error message">
          <div class="header">{errors.email}</div>
        </div>
      )
    }

    if (errors.password) {
      errorTextPassword = (
        <div class="ui error message">
          <div class="header">{errors.password}</div>
        </div>
      )
    }

    if (errors.password2) {
      errorTextPassword2 = (
        <div class="ui error message">
          <div class="header">{errors.password2}</div>
        </div>
      )
    }

    return (
      <div id="home-background-1">
      <div className="register with-shadow">
        <h1>Create an Account</h1>
        {errorTextName}
        {errorTextEmail}
        {errorTextPassword}
        {errorTextPassword2}
        <form noValidate className="ui form" onSubmit={this.handleOnSubmit}>
          <div className={classnames('field', {
            'field error': errors.name
          })}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className={classnames('field', {
            'field error': errors.email
          })}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className={classnames('field', {
            'field error': errors.password
          })}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div className={classnames('field', {
            'field error': errors.password2
          })}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              onChange={this.handleChange}
              value={this.state.password2}
            />
          </div>
          <button className="ui violet button" type="submit" style={{ width: '100%', marginTop: '10px' }}>Create Account</button>
        </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
