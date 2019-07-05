import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DeleteLesson from './DeleteLesson';
import '../my-created-content.css';


class MyLesson extends React.Component {
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
  const { lesson } = this.props

  return (
    <tr>
      <td>
        <Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
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
          <Link
            to={`/lesson/${lesson._id}/edit`}
            style={{ color: 'black' }}
          >
            <i
            className="edit outline icon my-edit-icon"
            />
          </Link>
          <i
            className="close icon my-delete-icon"
            onClick={() => this.setState({ showDeleteModal: !this.state.showDeleteModal })}
          />
      </td>
      {this.state.showDeleteModal ? (
          <DeleteLesson lesson={lesson} closeModal={this.closeDeleteModal} handleDeleteLesson={this.props.handleDeleteLesson}/>
        ) : (
          <React.Fragment>{}</React.Fragment>
      )}
    </tr>
  )
}
}

export default MyLesson
