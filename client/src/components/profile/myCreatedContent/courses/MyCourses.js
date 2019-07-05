import React from 'react';
import MyCourse from './MyCourse';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCourse } from '../../../../actions/courseActions';

class MyCourses extends React.Component {
  state = {
    courses: [],
  }

  componentWillMount() {
      this.setState({
        courses: [...this.props.courses]
      })
  }

  handleDeleteCourse = course => {
    this.setState({
      courses: this.state.courses.filter(c => c._id !== course._id)
    })
    this.props.deleteCourse(course._id)
  }

  render() {
    const courses = this.props.courses.map(course => {
      return <MyCourse course={course} handleDeleteCourse={this.handleDeleteCourse} />
      })

    let coursesList

    if (this.props.courses.length === 0) {
       coursesList = (
         <React.Fragment>
           <h3>You haven't created any courses yet! Click the button below to create a course.</h3>
           <Link to="/courses/new" className="ui violet button">
             Create a Course
           </Link>
         </React.Fragment>
         )
    } else {
      coursesList = (
        <React.Fragment>
        <h3>Courses</h3>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="ui center aligned">Created</th>
              <th className="ui center aligned">Likes</th>
              <th className="ui center aligned">Completes</th>
              <th className="ui center aligned">Actions</th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'scroll' }}>
          {courses}
          </tbody>
        </table>
        </React.Fragment>
      )
    }

    return (
      <div className="renshu-container with-shadow">
        {coursesList}
      </div>
    )
  }
}

export default MyCourses
