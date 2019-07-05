import React from 'react';
import MyLessons from './myCreatedContent/lessons/MyLessons';
import MyCourses from './myCreatedContent/courses/MyCourses';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';
import { getLessons } from '../../actions/lessonActions';
import { getCourses } from '../../actions/courseActions';
import Spinner from '../shared/Spinner';

class MyCreatedContent extends React.Component {
  state = {
    viewLessons: true,
    viewCourses: false
  }

  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle)
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
                <h2>{this.props.profile.profile.handle}'s Lessons</h2>
              </div>
              <div className="ui violet button" onClick={() => this.setState({ viewLessons: false, viewCourses: true })}>
                <h2>{this.props.profile.profile.handle}'s Courses</h2>
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
  lessonsLoading: state.lesson.loading,
  profile: state.profile,
  lessons: state.lesson.lessons.filter(lesson => lesson.author === state.profile.profile.handle),
  courses: state.course.courses.filter(course => course.author === state.profile.profile.handle)
})

export default connect(mapStateToProps, { getLessons, getCourses, getProfileByHandle  })(MyCreatedContent)
