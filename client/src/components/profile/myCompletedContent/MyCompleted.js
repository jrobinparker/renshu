import React from 'react';
import MyCompletedLessons from './lessons/MyCompletedLessons';
import MyCompletedCourses from './courses/MyCompletedCourses';
import { connect } from 'react-redux';
import { getLessons } from '../../../actions/lessonActions';
import { getCourses } from '../../../actions/courseActions';
import { Link } from 'react-router-dom';
import Spinner from '../../shared/Spinner';

class MyCompleted extends React.Component {
  state = {
    viewLessons: true,
    viewCourses: false,
  }

  componentDidMount() {
    this.props.getLessons()
    this.props.getCourses()
  }


  render() {
    if (this.props.lessonsLoading) {
      return <Spinner />
    } else {
      const { lessons, courses, auth } = this.props

      const completedLessons = lessons.filter(lesson => {
        return lesson.completes.find(c => c.user === auth.user.id)
      })

      const completedCourses = courses.filter(course => {
        return course.completes.find(c => c.user === auth.user.id)
      })

      let lessonsList, coursesList

      if (completedLessons === undefined || completedLessons === null || completedLessons.length === 0) {
        lessonsList = (
          <div className="renshu-container with-shadow">
            <h3>You haven't completed any lessons yet!</h3>
            <Link className="ui violet button" to="/lessons">Start a lesson</Link>
          </div>
        )
      } else {
        lessonsList = <MyCompletedLessons lessons={completedLessons} loading={this.props.lessonLoading} />
      }

      if (completedCourses === undefined || completedCourses === null || completedCourses.length === 0) {
        coursesList = (
          <div className="renshu-container with-shadow">
            <h3>You haven't completed any courses yet!</h3>
            <Link className="ui violet button" to="/courses">Start a course</Link>
          </div>
        )
      } else {
        coursesList = <MyCompletedCourses courses={completedCourses} loading={this.props.lessonLoading} />
      }

      return (
          <div style={{ width: '75%', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px', paddingBottom: '15px' }}>
              <div className="ui violet button" onClick={() => this.setState({ viewLessons: true, viewCourses: false })}>
                <h2>Completed Lessons</h2>
              </div>
              <div className="ui violet button" onClick={() => this.setState({ viewLessons: false, viewCourses: true })}>
                <h2>Completed Courses</h2>
              </div>
            </div>
          {
            this.state.viewLessons ? (
             <div>{lessonsList}</div>
          ) : (
            <div>{coursesList}</div>
          )
          }
          </div>
        )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  lessonsLoading: state.lesson.loading,
  lessons: state.lesson.lessons,
  courses: state.course.courses
})

export default connect(mapStateToProps, { getLessons, getCourses })(MyCompleted)
