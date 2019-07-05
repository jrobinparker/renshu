import React from 'react';
import { Link } from 'react-router-dom';
import MyCompletedLesson from './MyCompletedLesson';

const MyCompletedLessons = props => {

    let lessonsList

    if (props.lessons === undefined || props.lessons === null || props.lessons.length === 0) {
       lessonsList = (
         <React.Fragment>
           <h3>You haven't completed any lessons yet!</h3>
           <Link to="/lessons" className="ui violet button">
             Start a Lesson
           </Link>
         </React.Fragment>
         )
    } else {
      const lessons = props.lessons.map(lesson => {
        return <MyCompletedLesson lesson={lesson} />
        })
      lessonsList = (
        <React.Fragment>
        <h3>Completed lessons</h3>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'scroll' }}>
          {lessons}
          </tbody>
        </table>
        </React.Fragment>
      )
    }

    return (
      <div className="renshu-container with-shadow">
        {lessonsList}
      </div>
    )
}

export default MyCompletedLessons
