import React from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike, addComplete, removeComplete, getLesson } from '../../../actions/lessonActions';

class LessonDataBar extends React.Component {

  onLikeClick = () => {
    this.props.addLike(this.props.lesson._id)
  }

  onUnlikeClick = () => {
    this.props.removeLike(this.props.lesson._id)
  }

  onCompleteClick = () => {
    this.props.addComplete(this.props.lesson._id)
  }

  onRemoveCompleteClick = () => {
    this.props.removeComplete(this.props.lesson._id)
  }

  findUserLike = (likes) => {
    const { auth, lesson } = this.props
    if (likes && likes.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <div className="ui segment" onClick={this.onUnlikeClick} style={{ cursor: 'pointer' }} alt="Unlike">
          <i className="thumbs up outline icon" style={{ color: 'green', fontSize: '1.5rem' }}></i>

            <span className="ui green small label">{lesson.likes.length}</span>
        </div>
      )
    } else {
      return (
        <div className="ui segment" onClick={this.onLikeClick} style={{ cursor: 'pointer' }} alt="Like">
          <i className="thumbs up outline icon" style={{ color: 'gray', fontSize: '1.5rem' }}></i>
            {likes ? (
              <span className="ui grey small label">{lesson.likes.length}</span>
            ) : (
              <span className="ui grey small label">0</span>
            )}
        </div>
      )
    }
  }

  findUserComplete = (completes) => {
    const { auth, lesson } = this.props
    if (completes && completes.filter(completes => completes.user === auth.user.id).length > 0) {
      return (
        <div className="ui segment" style={{ cursor: 'pointer' }} onClick={this.onRemoveCompleteClick}>
          <i className="check circle outline icon" style={{ color: 'green', fontSize: '1.5rem' }}></i>

            <span className="ui green small label">{lesson.completes.length}</span>
        </div>
      )
    } else {
      return (
        <div className="ui segment" style={{ cursor: 'pointer' }}  onClick={this.onCompleteClick}>
          <i className="check circle outline icon" style={{ color: 'gray', fontSize: '1.5rem' }}></i>
            {completes ? (
              <span className="ui grey small label">{lesson.completes.length}</span>
            ) : (
              <span className="ui grey small label">0</span>
            )}
        </div>
      )
    }
  }

  render() {
    const { lesson } = this.props
    return (
      <React.Fragment>
        {this.findUserLike(lesson.likes)}

        {this.findUserComplete(lesson.completes)}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, addComplete, removeComplete, getLesson })(LessonDataBar)
