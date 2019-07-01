import React from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../actions/courseActions';
import CourseFeed from './CourseFeed';
import Spinner from '../../components/shared/Spinner';

class Courses extends React.Component {
  componentDidMount() {
    this.props.getCourses()
  }

  render() {
    const { courses, loading, auth } = this.props

    const sortedCourses = courses.sort(function(a, b) {
      const dateA = new Date(a.created)
      const dateB = new Date(b.created)
      return dateB - dateA
    })

    let courseContent
    if (courses === null || loading) {
      courseContent = <Spinner />
    } else {
      courseContent = <CourseFeed courses={sortedCourses} user={auth.user} />
    }
    return (
      <React.Fragment>
        {courseContent}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    loading: state.loading,
    auth: state.auth
})

export default connect(mapStateToProps, { getCourses })(Courses)
