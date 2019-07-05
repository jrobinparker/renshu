import React from 'react';
import ReactDOM from 'react-dom';

class DeleteLesson extends React.Component {

  deleteLesson = (e, lesson) => {
    this.props.closeModal(e)
    this.props.handleDeleteLesson(lesson)
  }

  render() {
  const { closeModal, deleteLesson, lesson } = this.props

  return ReactDOM.createPortal(
    <div onClick={this.props.closeModal} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active" style={{ padding: '20px' }}>
         <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem' }}>Are you sure you want to delete <strong>{lesson.title}</strong>?</p>
          <div className="ui secondary button" onClick={closeModal}>Cancel</div>
          <div className="ui red button" onClick={e => this.deleteLesson(e, lesson)}>Delete</div>
        </div>
        </div>
      </div>
    ,
    document.querySelector('#delete-modal')
    )
  }
}

export default DeleteLesson;
