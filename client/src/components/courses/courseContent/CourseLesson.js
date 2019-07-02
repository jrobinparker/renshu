import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class CourseLesson extends React.Component {
  state = {
    showContent: false
  }

  render() {
    const { title, description, author, level, id, completes, auth, created } = this.props
    return (
      <div className="course-lesson-container with-shadow" style={{ marginBottom: "10px" }}>

        <div style={{ marginRight: '10px', display: 'inline-block' }}>
          {completes.find(complete => complete.user === auth.user.id) ? (
            <i className="check circle icon" style={{ color: 'green', fontSize: '1.5rem' }} />
          ) :(
            <i className="check circle icon" style={{ color: 'gray', fontSize: '1.5rem' }} />
          )}
        </div>

        <h3 style={{ display: 'inline-block', position: 'relative', left: '10px' }}>
          {title} {level}
        </h3>

        <i className="chevron circle down icon" style={{ position: 'relative', left: '20px' }} onClick={() => this.setState({ showContent: !this.state.showContent })} />
        {this.state.showContent ? (
          <div className="course-lesson-description">
          <p>by {author} | <Moment format="MM/DD/YYYY">{created}</Moment></p>
          <p>{description}</p>
          <Link to={`/lesson/${id}`} className="ui button positive" style={{ with: '100%' }} target="_blank"><i className="rocket icon" style={{ marginRight: '10px' }} />Launch</Link>
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(CourseLesson)
