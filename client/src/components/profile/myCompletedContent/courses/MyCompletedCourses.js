import React from 'react';
import { Link } from 'react-router-dom';
import MyCompletedCourse from './MyCompletedCourse';

const MyCompletedCourses = props => {

    let coursesList

    if (props.courses === undefined) {
       coursesList = (
         <React.Fragment>
           <h3>You haven't completed any courses yet!</h3>
           <Link to="/courses" className="ui violet button">
             Start a Course
           </Link>
         </React.Fragment>
         )
    } else {
      const courses = props.courses.map(course => {
        return <MyCompletedCourse course={course} />
        })
      coursesList = (
        <React.Fragment>
        <h3>Completed courses</h3>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th>Title</th>
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

export default MyCompletedCourses
