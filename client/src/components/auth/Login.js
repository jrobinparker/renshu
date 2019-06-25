import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    errors: {}
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleOnSubmit = e => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    let errorTextEmail, errorTextPassword

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

    return (
      <div id="home-background-1">
      <div className="login with-shadow">
        <h1>Login to Your Account</h1>
        {errorTextEmail}
        {errorTextPassword}
        <form noValidate className="ui form" onSubmit={this.handleOnSubmit}>
        <div className={classnames('field', {
          'field error': errors.email
        })}>
            <label>Email</label>
                <input
                  label="Email"
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
          <button className="ui violet button" type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
