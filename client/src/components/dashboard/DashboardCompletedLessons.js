import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCompletedLessons = props => {
  return (
    <div className="six wide column">
      <div className="dashboard-list" id="with-shadow">
        <h3 style={{ marginBottom: '10px '}}>Completed Lessons</h3>
        {props.lessons.splice(0, 5).map(lesson => {
            return (
                <div className="ui list">
                  <a className="item">
                    <i className="right triangle icon" />
                    <div className="content">
                      <div className="header" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
                      </div>
                     </div>
                  </a>
                </div>
              )}
           )}
           <Link className="ui violet button" to="/mycompleted" style={{ width: '100%' }}>View all completed lessons</Link>
   </div>
 </div>
  )
}

export default DashboardCompletedLessons
