import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CourseSliderItem = props => {

    const { course, user } = props
    const { completes } = course
    let didComplete = false
    const completeList = course.completes.map(complete => {
      if (complete.user === user.id) {
        didComplete = true
      }
    })

    return (

      <div className="renshu-container with-shadow">
        <div className="content">
          <Link to={`/course/${course._id}`} style={{ display: 'inline-block', fontSize: '1.25rem' }}>{course.title}</Link>
          {didComplete ? (
            <i className="check circle outline icon" style={{ color: 'green', fontSize: '1.25rem' }} />
          ) : (
            <i className="check circle outline icon" style={{ color: 'gray', fontSize: '1.25rem' }} />
          )}
        </div>
        {course.description}
        <div>
          by <Link to={`/profile/${course.author}`}>{course.author}</Link> | <small><Moment format="MM/DD/YYYY">{course.created}</Moment></small>
        </div>

        </div>
    )
}

export default CourseSliderItem;
