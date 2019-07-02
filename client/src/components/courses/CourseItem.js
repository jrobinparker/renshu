import React from 'react';
import { Link } from 'react-router-dom';
import LevelBadge from '../shared/LevelBadge';
import Moment from 'react-moment';

class CourseItem extends React.Component {

  render() {
    const { course } = this.props

    return (

      <div className="ui card with-shadow">
        <div className="content">
          <Link to={`/courses/${course._id}`} style={{ display: 'inline-block', fontSize: '1.25rem' }}>{course.title}</Link>
          <LevelBadge level={course.level} style={{ marginRight: '20px' }}/>
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                   {course.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content" style={{ fontSize: '1.25rem' }}>
          by <Link to={`/profile/${course.author}`}>{course.author}</Link> | <Moment format="MM/DD/YYYY">{course.created}</Moment>

        </div>
      </div>
    )
  }
}

export default CourseItem;
