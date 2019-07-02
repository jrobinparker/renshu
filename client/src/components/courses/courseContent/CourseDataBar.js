import React from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike, addComplete, removeComplete, getCourse } from '../../../actions/courseActions';

class CourseDataBar extends React.Component {

  onLikeClick = () => {
    this.props.addLike(this.props.id)
  }

  onUnlikeClick = () => {
    this.props.removeLike(this.props.id)
  }

  onCompleteClick = () => {
    this.props.addComplete(this.props.id)
  }

  onRemoveCompleteClick = () => {
    this.props.removeComplete(this.props.id)
  }

  findUserLike = (likes) => {
    const { auth } = this.props
    if (likes && likes.filter(like => like.user === auth.user.id).length > 0) {
      return (
        <div onClick={this.onUnlikeClick} style={{ display: 'inline-block', marginRight: '30px', cursor: 'pointer' }} alt="Unlike">
          <i className="thumbs up outline icon" style={{ color: 'green', fontSize: '2rem' }} />
            <span class="ui green small label">{likes.length}</span>
        </div>
      )
    } else {
      return (
        <div onClick={this.onLikeClick} style={{ display: 'inline-block', marginRight: '10px', cursor: 'pointer' }} alt="Like">
          <i className="thumbs up outline icon" style={{ color: 'gray', fontSize: '2rem' }} />
            {likes ? (
              <span class="ui grey small label">{likes.length || 0}</span>
            ) : (
              null
            )}
        </div>
      )
    }
  }

  findUserComplete = () => {
    const { auth, completes } = this.props
    if (completes && completes.filter(completes => completes.user === auth.user.id).length > 0) {
      return (
        <div style={{ display: 'inline-block', cursor: 'pointer' }} onClick={this.onRemoveCompleteClick}>
          <i className="check circle outline icon" style={{ color: 'green', fontSize: '2rem' }} />

            <span class="ui green small label">{completes.length}</span>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'inline-block', cursor: 'pointer' }}  onClick={this.onCompleteClick}>
          <i className="check circle outline icon" style={{ color: 'gray', fontSize: '2rem' }}></i>
            {completes ? (
              <span class="ui grey small label">{completes.length || 0}</span>
            ) : (
              null
            )}
        </div>
      )
    }
  }

  render() {
    const { likes, completes } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        {this.findUserLike(likes)}

        {this.findUserComplete(completes)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, addComplete, removeComplete, getCourse })(CourseDataBar)
