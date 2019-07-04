import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import '../my-created-content.css';

class MyCourse extends React.Component {

  render() {

  const { course } = this.props

  return (
      <tr>
        <td>
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
        </td>
        <td className="ui center aligned">
          <Moment format="MM/DD/YYYY">{course.created}</Moment>
        </td>
        <td className="ui center aligned">
          {course.likes.length}
        </td>
        <td className="ui center aligned">
          {course.completes.length}
        </td>
        <td className="ui center aligned" style={{ fontSize: '1.25rem' }}>
            <i
              className="edit outline icon my-edit-icon"
            />
          <i
            className="close icon my-delete-icon"
          />
        </td>
      </tr>
  )
  }
}

export default MyCourse
