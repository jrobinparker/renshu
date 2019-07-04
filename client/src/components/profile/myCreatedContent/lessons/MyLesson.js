import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import '../my-created-content.css';


class MyLesson extends React.Component {

  render() {
  const { lesson } = this.props

  return (
    <tr>
      <td>
        <Link to={`/lessons/${lesson._id}`} >{lesson.title}</Link>
      </td>
      <td className="ui center aligned">
        <Moment format="MM/DD/YYYY">{lesson.created}</Moment>
      </td>
      <td className="ui center aligned">
        {lesson.likes.length}
      </td>
      <td className="ui center aligned">
        {lesson.completes.length}
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

export default MyLesson
