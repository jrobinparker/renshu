import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourse } from '../../../actions/courseActions';
import CourseLesson from './CourseLesson';
import CourseDataBar from './CourseDataBar';
import Spinner from '../../shared/Spinner';
import Moment from 'react-moment';
import LevelBadge from '../../shared/LevelBadge';
import './course.css';

class CourseContent extends React.Component {
  state = {
    courseLessons: []
  }

  componentDidMount() {
      this.props.getCourse(this.props.match.params.id)
  }

  render() {

    const { auth, course, courseLessons, loading } = this.props
    let courseContent
    let displayCourseLessons
    if (!course || loading) {
      courseContent = <Spinner />
    } else {
      courseContent = (
        <div>
        <div className="renshu-container with-shadow" style={{ marginBottom: "10px", display: 'inline-block' }}>
          <div className="ui grid">
            <div className="four column row">
              <div className="left floated column">
                <h2 style={{ display: 'inline-block', marginRight: '10px' }}>{course.title}</h2>
                <LevelBadge level={course.level}/>
                <div style={{ display: 'block', marginBottom: '5px' }}>
                  <small style={{ color: 'gray' }}>
                    <Link to={`/profile/${course.author}`}>
                      {course.author}
                    </Link>
                     -
                    <Moment format="MM/DD/YYYY">
                      {course.created}
                    </Moment>
                  </small>
                </div>
              </div>
                <div className="right floated column" style={{ textAlign: 'center', marginTop: '30px' }}>
                    <CourseDataBar likes={course.likes} completes={course.completes} id={this.props.match.params.id}/>
                  </div>
          </div>
          <div className="row">
            <div style={{ display: 'block', marginLeft: '15px' }}>
              {course.description}
            </div>
          </div>
          </div>
        </div>

      </div>
      )
    }

    if (!courseLessons) {
      displayCourseLessons = <Spinner />
    } else {
      displayCourseLessons = courseLessons.map((lesson, i) => {
        return (
          <CourseLesson
            key={i}
            title={lesson.title}
            description={lesson.description}
            author={lesson.author}
            id={lesson._id}
            completes={lesson.completes}
            />
        )
      })
    }
    return (
      <div className="ui container">
        {courseContent}
        {displayCourseLessons}
      </div>
    )
}
}

const mapStateToProps = state => ({
  course: state.course.course,
  courseLessons: state.course.courseLessons,
  auth: state.auth
})


export default connect(mapStateToProps, { getCourse })(CourseContent);
