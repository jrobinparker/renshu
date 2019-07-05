import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { slide as Menu } from 'react-burger-menu'
import './sidebar.css'

class SidebarMenu extends React.Component {

  state = {
    menuOpen: false
  }

  handleStateChange(state) {
   this.setState({menuOpen: state.isOpen})
  }

  closeMenu() {
    this.setState({menuOpen: false})
  }

  toggleMenu() {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  onLogoutClick = e => {
    this.props.clearCurrentProfile()
    this.props.logoutUser()
    this.closeMenu()
  }


  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <div>
        <ul style={{ listStyle: 'none', paddingTop: '20px', paddingRight: '30px', fontSize: '1.5rem' }}>
          <li className="menu-item"><Link to="/dashboard"  onClick={this.closeMenu.bind(this)}>dashboard</Link></li>
          <li className="menu-item"><Link to="/mycontent" onClick={this.closeMenu.bind(this)}>my created content</Link></li>
          <li className="menu-item"><Link to="/mycompleted" onClick={this.closeMenu.bind(this)}>my completes</Link></li>
          <li className="menu-item"><Link to="/lessons" onClick={this.closeMenu.bind(this)}>lessons</Link></li>
          <li className="menu-item"><Link to="/courses" onClick={this.closeMenu.bind(this)}>courses</Link></li>
          <li className="menu-item"><Link to="/lessons/new" onClick={this.closeMenu.bind(this)}>create a lesson</Link></li>
          <li className="menu-item"><Link to="/courses/new" onClick={this.closeMenu.bind(this)}>create a course</Link></li>
          <li className="menu-item"><Link to="/login" onClick={this.onLogoutClick.bind(this)}>logout</Link></li>
        </ul>
      </div>
    )

    const guestLinks = (
      <div>
      <ul style={{ listStyle: 'none', paddingTop: '20px', paddingRight: '30px', fontSize: '1.5rem' }}>
        <li className="menu-item"><Link to="/" onClick={this.closeMenu.bind(this)}>home</Link></li>
        <li className="menu-item"><Link to="/register" onClick={this.closeMenu.bind(this)}>create an account</Link></li>
        <li className="menu-item"><Link to="/login" onClick={this.closeMenu.bind(this)}>login</Link></li>
      </ul>
      </div>
    )

    return (
      <Menu isOpen={this.state.menuOpen} closeMenu={this.closeMenu} onStateChange={(state) => this.handleStateChange(state)}>
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
