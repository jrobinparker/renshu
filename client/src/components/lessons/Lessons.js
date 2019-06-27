import React from 'react';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lessonActions';
import LessonFeed from './LessonFeed'
import Spinner from '../shared/Spinner';

class Lessons extends React.Component {
  componentDidMount() {
    this.props.getLessons()
  }

  render() {
    const { lessons, loading } = this.props.lesson
    const sortedLessons = lessons.sort(function(a, b) {
      const dateA = new Date(a.created)
      const dateB = new Date(b.created)
      return dateB - dateA
    })
    let lessonContent

    if (lessons === null || loading) {
      lessonContent = <Spinner />
    } else {
      lessonContent = <LessonFeed lessons={lessons} />
    }
    
    return (
      <React.Fragment>
          {lessonContent}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  lesson: state.lesson,
  auth: state.auth
})

export default connect(mapStateToProps, { getLessons })(Lessons)
