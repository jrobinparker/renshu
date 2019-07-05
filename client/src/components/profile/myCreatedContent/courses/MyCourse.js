import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DeleteCourse from './DeleteCourse';
import '../my-created-content.css';

class MyCourse extends React.Component {
  state = {
    showDeleteModal: false,
  }

  closeDeleteModal = e => {
    e.preventDefault()
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }

  render() {

  const { course } = this.props

  return (
      <tr>
        <td>
          <Link to={`/course/${course._id}`}>{course.title}</Link>
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
          <Link
            to={`/course/${course._id}/edit`}
            style={{ color: 'black' }}
          >
            <i
              className="edit outline icon my-edit-icon"
            />
          </Link>
          <i
            className="close icon my-delete-icon"
            onClick={() => this.setState({ showDeleteModal: !this.state.showDeleteModal})}
          />
        </td>
        {this.state.showDeleteModal ? (
            <DeleteCourse course={course} closeModal={this.closeDeleteModal} handleDeleteCourse={this.props.handleDeleteCourse}/>
          ) : (
            <React.Fragment>{}</React.Fragment>
        )}
      </tr>
  )
  }
}

export default MyCourse
