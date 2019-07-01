import React from 'react';
import CourseItem from './CourseItem';

class CourseFeed extends React.Component {
  state = {
    filter: ''
  }

  render() {
    const { courses, user } = this.props

    let courseList

    if (this.state.filter === '') {
      courseList = courses.map(course => <CourseItem key={course._id} course={course} user={user} />)
    }

    if (this.state.filter === 'N5') {
      courseList = courses
        .filter(course => course.level === 'N5')
        .map(course => <CourseItem key={course._id} course={course}  user={user} />)
    }

    if (this.state.filter === 'N4') {
      courseList = courses
        .filter(course => course.level === 'N4')
        .map(course => <CourseItem key={course._id} course={course}  user={user} />)
    }

    if (this.state.filter === 'N3') {
      courseList = courses
        .filter(course => course.level === 'N3')
        .map(course => <CourseItem key={course._id} course={course}  user={user} />)
    }

    if (this.state.filter === 'N2') {
      courseList = courses
        .filter(course => course.level === 'N2')
        .map(course => <CourseItem key={course._id} course={course}  user={user} />)
    }

    if (this.state.filter === 'N1') {
      courseList = courses
        .filter(course => course.level === 'N1')
        .map(course => <CourseItem key={course._id} course={course}  user={user} />)
    }

    return (

      <div className="ui grid">
        <div className="three wide column">
        <h3>Course filter</h3>
            <div className="ui compact menu" style={{ marginBottom: '10px' }}>
              <div className="ui simple dropdown item">
                Filter by JLPT level
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" onClick={() => this.setState({ filter: '' })}>All</div>
                  <div className="item" onClick={() => this.setState({ filter: 'N1' })}>N1</div>
                  <div className="item" onClick={() => this.setState({ filter: 'N2' })}>N2</div>
                  <div className="item" onClick={() => this.setState({ filter: 'N3' })}>N3</div>
                  <div className="item" onClick={() => this.setState({ filter: 'N4' })}>N4</div>
                  <div className="item" onClick={() => this.setState({ filter: 'N5' })}>N5</div>
                </div>
              </div>
            </div>
      </div>
      <div className="thirteen wide column">
          <div className="ui cards">
            {courseList}
          </div>
        </div>
      </div>
    )
  }
}

export default CourseFeed;
