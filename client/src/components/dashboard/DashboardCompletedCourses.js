import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCompletedCourses = props => {
  return (
    <div className="six wide column">
      <div className="dashboard-list" id="with-shadow">
        <h3 style={{ marginBottom: '10px '}}>Completed Courses</h3>
        {props.courses.splice(0, 5).map(course => {
            return (
                <div className="ui list">
                  <a className="item">
                    <i className="right triangle icon" />
                    <div className="content">
                      <div className="header" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><Link to={`/course/${course._id}`}>{course.title}</Link>
                      </div>
                     </div>
                  </a>
                </div>
              )}
           )}
           <Link className="ui violet button" to="/mycompletes" style={{ width: '100%' }}>View all completed courses</Link>
   </div>
 </div>
  )
}

export default DashboardCompletedCourses
