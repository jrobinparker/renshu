import React from 'react';
import MyLessons from './lessons/MyLessons';
import MyCourses from './courses/MyCourses';
import { connect } from 'react-redux';
import { getLessons } from '../../../actions/lessonActions';
import { getCourses } from '../../../actions/courseActions';
import Spinner from '../../shared/Spinner';

class MyCreatedContent extends React.Component {
  state = {
    viewLessons: true,
    viewCourses: false
  }

  componentDidMount() {
    this.props.getLessons()
    this.props.getCourses()
  }


  render() {
    if (this.props.lessonsLoading) {
      return <Spinner />
    } else {
      return (
          <div style={{ width: '75%', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px', paddingBottom: '15px' }}>
              <div className="ui violet button" onClick={() => this.setState({ viewLessons: true, viewCourses: false })}>
                <h2>My Lessons</h2>
              </div>
              <div className="ui violet button" onClick={() => this.setState({ viewLessons: false, viewCourses: true })}>
                <h2>My Courses</h2>
              </div>
            </div>

          {
            this.state.viewLessons ? (
             <MyLessons lessons={this.props.lessons} loading={this.props.lessonLoading} />
          ) : (
            <MyCourses courses={this.props.courses} loading={this.props.courses.loading} />
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
  lessons: state.lesson.lessons.filter(lesson => lesson.authorId === state.auth.user.id),
  courses: state.course.courses.filter(course => course.authorId === state.auth.user.id)
})

export default connect(mapStateToProps, { getLessons, getCourses })(MyCreatedContent)
