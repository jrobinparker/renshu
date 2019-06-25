import React from 'react';
import SidebarMenu from './SidebarMenu'
import './navbar.css';


class Navbar extends React.Component {
  state = {
    menuOpen: false
  }

   handleStateChange(state) {
     this.setState({menuOpen: this.state.menuOpen})
   }

   closeMenu() {
     this.setState({menuOpen: false})
   }

  toggleMenu() {
    this.setState(state => ({menuOpen: !this.state.menuOpen}))
  }

  render() {


    return (
      <div>
      <SidebarMenu isOpen={this.handleStateChange} closeMenu={this.closeMenu} onStateChange={(state) => this.handleStateChange(state)} />

      <div className="navbar">
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '5px' }}>renshu</h1>
      </div>
      </div>
    )
  }
}

export default Navbar
