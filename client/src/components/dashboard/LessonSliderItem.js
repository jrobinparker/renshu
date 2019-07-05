import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const LessonSliderItem = props => {

    const { lesson, user } = props
    const { completes } = lesson
    let didComplete = false
    const completeList = lesson.completes.map(complete => {
      if (complete.user === user.id) {
        didComplete = true
      }
    })

    return (

      <div className="renshu-container with-shadow">
        <div className="content">
          <Link to={`/lesson/${lesson._id}`} style={{ display: 'inline-block', fontSize: '1.25rem' }}>{lesson.title}</Link>
          {didComplete ? (
            <i className="check circle outline icon" style={{ color: 'green', fontSize: '1.25rem' }} />
          ) : (
            <i className="check circle outline icon" style={{ color: 'gray', fontSize: '1.25rem' }} />
          )}
        </div>
        {lesson.description}
        <div>
          by <Link to={`/profile/${lesson.author}`}>{lesson.author}</Link> | <small><Moment format="MM/DD/YYYY">{lesson.created}</Moment></small>
        </div>

        </div>
    )
}

export default LessonSliderItem;
