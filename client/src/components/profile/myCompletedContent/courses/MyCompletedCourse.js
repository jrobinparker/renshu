import React from 'react';
import { Link } from 'react-router-dom';

const MyCompletedCourse = props => {
  const { course } = props
  return (
    <tr>
      <td>
        <Link to={`/course/${course._id}`}>{course.title}</Link>
      </td>
    </tr>
  )
}

export default MyCompletedCourse
