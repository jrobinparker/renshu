import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ProfileCreatedLesson = props => {
  return (
    <div className="item">
      <i className="right triangle icon"></i>
      <div className="content">
          <div className="header" style={{ fontSize: '1rem', marginBottom: '5px' }}>
          <Link to={`/lesson/${props.lesson._id}`} style={{ marginRight: '15px' }}>{props.lesson.title}</Link>
          <small>(created <Moment format="MM/DD/YYYY">{props.lesson.created}</Moment>)</small>
          </div>
      </div>
    </div>
  )
}

export default ProfileCreatedLesson
