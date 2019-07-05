import React from 'react';
import SidebarMenu from './SidebarMenu'
import './navbar.css';


class Navbar extends React.Component {

  render() {


    return (
      <div>
      <SidebarMenu />
        <div className="navbar">
          <h1 style={{ fontSize: '1.5rem', letterSpacing: '5px' }}>renshu</h1>
        </div>
      </div>
    )
  }
}

export default Navbar
