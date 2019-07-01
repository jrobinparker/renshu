import React from 'react';
import { Link } from 'react-router-dom';

class ReviewCourse extends React.Component {

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  saveAndContinue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const { title, description, level, lessons } = this.props.course


    return (
      <div className="lesson-form with-shadow">
        <form className="ui form" onSubmit={this.props.onSubmit}>
          <h2>Review Course</h2>
          <h3>Course Title: {title}</h3>
          <h3>Level: {level}</h3>
          <h3>Description: {description}</h3>
          <h3>Lessons:</h3>
          <ol>
          {lessons.map(lesson => {
            return <li style={{ marginBottom: '10px', fontSize: '1.5rem' }}><Link to={`/lessons/${lesson._id}`} target="_blank" rel="noopener noreferrer">{lesson.title}</Link></li>
          })}
          </ol>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
            <button className="ui violet button" style={{ width: '40%' }}>Save</button>
          </div>

        </form>
      </div>

    )
  }
}

export default ReviewCourse
