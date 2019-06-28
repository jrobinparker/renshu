import React from 'react';
import { Link } from 'react-router-dom';
import LevelBadge from '../shared/LevelBadge';
import './lessons.css';
import Moment from 'react-moment';

class LessonItem extends React.Component {

  render() {
    const { lesson } = this.props
    return (

      <div className="ui card with-shadow">
        <div className="content">
          <Link to={`/lessons/${lesson._id}`} style={{ display: 'inline-block', fontSize: '1.25rem' }}>{lesson.title}</Link><LevelBadge level={lesson.level} />
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                   {lesson.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content" style={{ fontSize: '1.25rem' }}>
          by <Link to={`/profile/${lesson.author}`}>{lesson.author}</Link> | <small><Moment format="MM/DD/YYYY">{lesson.created}</Moment></small>

        </div>
      </div>
    )
  }
}

export default LessonItem;
