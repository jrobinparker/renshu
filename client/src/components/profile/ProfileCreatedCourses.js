import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCreatedCourse from './ProfileCreatedCourse'

const ProfileCreatedCourses = props => {
  let courses, viewAllButton
  if (props.courses.length === 0) {
    courses = <p>{props.username} hasn't created any courses yet!</p>
  } else {
    courses = props.courses.map(course => {
      return <ProfileCreatedCourse course={course} />
      })
  }

  if (props.courses.length > 5) {
    viewAllButton = <Link className="ui violet button" to={`/profile/${props.username}/created-content`} style={{ width: '100%' }}>View all courses</Link>
  }

  return (
    <div className="renshu-container with-shadow" style={{ width: '30%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div className="ui list" style={{ marginBottom: '10px' }}>
          <h3>{props.username}'s courses</h3>
          {courses}
        </div>
      </div>
      {viewAllButton}
    </div>
  )
}

export default ProfileCreatedCourses
