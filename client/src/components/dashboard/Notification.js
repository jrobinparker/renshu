import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Notification = props => {
  return (
    <div className="notification">
      {props.message}
    <br />
      <Link to="/mycontent">View my {props.type}</Link>
    </div>
  )
}

export default Notification
