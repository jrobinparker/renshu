import React from 'react';
import { Link } from 'react-router-dom';
import MyLesson from './MyLesson';
import { connect } from 'react-redux';
import { deleteLesson } from '../../../../actions/lessonActions';

class MyLessons extends React.Component {
  state = {
    lessons: []
  }

  componentWillMount() {
      this.setState({
        lessons: [...this.props.lessons]
      })
  }

  handleDeleteLesson = lesson => {
    this.setState({
      lessons: this.state.lessons.filter(l => l._id !== lesson._id)
    })
    this.props.deleteLesson(lesson._id)
  }

  render() {
    const lessons = this.props.lessons.map(lesson => {
      return <MyLesson lesson={lesson} handleDeleteLesson={this.handleDeleteLesson}/>
      })

    let lessonsList

    if (this.props.lessons.length === 0) {
       lessonsList = (
         <React.Fragment>
           <h3>You haven't created any lessons yet! Click the button below to create a lesson.</h3>
           <Link to="/lessons/new" className="ui violet button">
             Create a Lesson
           </Link>
         </React.Fragment>
         )
    } else {
      lessonsList = (
        <React.Fragment>
        <h3 style={{ }}>My created lessons</h3>
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
}

export default connect(null, { deleteLesson })(MyLessons)
