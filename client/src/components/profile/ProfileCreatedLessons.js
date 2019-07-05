import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCreatedLesson from './ProfileCreatedLesson';

const ProfileCreatedLessons = props => {
  let lessons, viewAllButton
  if (props.lessons.length === 0) {
    lessons = <p>{props.username} hasn't created any lessons yet!</p>
  } else {
    lessons = props.lessons.map(lesson => {
      return <ProfileCreatedLesson lesson={lesson} />
      })
  }

  if (props.lessons.length > 5) {
    viewAllButton = <Link className="ui violet button" to={`/profile/${props.username}/created-content`} style={{ width: '100%' }}>View all lessons</Link>
  }

  return (
    <div className="renshu-container with-shadow" style={{ width: '30%', marginRight: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'baseline' }}>
        <div className="ui list" style={{ marginBottom: '10px' }}>
          <h3>{props.username}'s lessons</h3>
          {lessons}
        </div>
      </div>
      {viewAllButton}
    </div>
  )
}

export default ProfileCreatedLessons
