import React from 'react';

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

  render() {

    return (
      <div className="login with-shadow">
        <h1>Login to Your Account</h1>
        <form noValidate className="ui form">
        <div className="field">
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
          <div className="field">
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
    )
  }
}

export default Login;
