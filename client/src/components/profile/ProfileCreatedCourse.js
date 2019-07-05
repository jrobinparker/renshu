import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ProfileCreatedCourse = props => {
  return (
    <div className="item">
      <i className="right triangle icon"></i>
      <div className="content">
          <div className="header" style={{ fontSize: '1rem', marginBottom: '5px' }}>
          <Link to={`/courses/${props.course._id}`} style={{ marginRight: '15px' }}>{props.course.title}</Link>
          <small>(created <Moment format="MM/DD/YYYY">{props.course.created}</Moment>)</small>
          </div>
      </div>
    </div>
  )
}

export default ProfileCreatedCourse
