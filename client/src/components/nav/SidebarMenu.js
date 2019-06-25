import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { slide as Menu } from 'react-burger-menu'
import './sidebar.css'

class SidebarMenu extends React.Component {

  onLogoutClick = e => {
    this.props.clearCurrentProfile()
    this.props.logoutUser()
    this.props.closeMenu()
  }


  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <div>

        <ul style={{ listStyle: 'none', paddingTop: '20px', paddingRight: '30px', fontSize: '1.5rem' }}>
          <li style={{ marginBottom: '20px' }}>dashboard</li>
          <li style={{ marginBottom: '20px' }}>logout</li>
        </ul>
      </div>
    )

    const guestLinks = (
      <div>
      <ul style={{ listStyle: 'none', paddingTop: '20px', paddingRight: '30px', fontSize: '1.5rem' }}>
        <li style={{ marginBottom: '20px' }}>home</li>
        <li style={{ marginBottom: '20px' }}>create an account</li>
        <li>login</li>
      </ul>
      </div>
    )

    return (
      <Menu>
        {isAuthenticated ? (authLinks) : (guestLinks)}
      </Menu>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(SidebarMenu)
