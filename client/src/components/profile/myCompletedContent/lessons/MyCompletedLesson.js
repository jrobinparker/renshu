import React from 'react';
import { Link } from 'react-router-dom';

const MyCompletedLesson = props => {
  const { lesson } = props
  return (
    <tr>
      <td>
        <Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
      </td>
    </tr>
  )
}

export default MyCompletedLesson
