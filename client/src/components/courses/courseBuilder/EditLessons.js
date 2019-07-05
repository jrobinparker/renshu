import React from 'react';
import './add-lessons.css';

class EditLessons extends React.Component {

  state = {
    lessons: []
  }

  setCheckedItems = (state, props) => {
    this.state.lessons.map(lesson => {
      const findLesson = this.props.lessons.filter(l => l !== lesson)
      if (findLesson) {
        const checkbox = document.getElementById(lesson._id)
        checkbox.setAttribute("checked", true)
      }
    })
  }

  componentDidMount() {
    this.setState({
      lessons: [...this.props.courseLessons]
    })
  }




  handleAddLesson = (e, lesson) => {
    if (e.target.checked) {
      this.setState({
        lessons: this.state.lessons.concat(lesson)
      })
    } else {
      this.setState({
        lessons: this.state.lessons.filter(lesson => lesson.title !== e.target.name)
      })
    }
    console.log(this.state.lessons)
  }

  saveAndContinue = e => {
    e.preventDefault()
    const { lessons } = this.state
    this.props.addLessons(lessons)
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }


  render() {
    let lessonsList
    if (this.state.lessons && this.state.lessons.length > 0) {
      lessonsList = this.state.lessons.map(lesson => {
        return <li style={{ fontSize: '1.25rem', paddingBottom: '10px' }}><i class="check icon" />{lesson.title}</li>
      })
    }
    this.setCheckedItems(this.state.lessons, this.props.lessons)
    return (
      <div className="ui centered grid">

        <div className="fifteen wide column">
            <div className="renshu-container with-shadow">
              <h3 style={{ textAlign: 'center' }}>Add/Remove Lessons</h3>
            </div>
          </div>
        <div className="eight wide column" style={{ height: '100vh' }}>
          <div className="renshu-container add-lessons with-shadow">
          <div className="ui form">
                {this.props.lessons.map((lesson, i) => {
                  return (
                    <div className="add-lesson-item" key={i}>
                      <div style={{ alignSelf: 'flex-start' }}>
                        {lesson.title}
                      </div>
                      <div style={{ alignSelf: 'flex-end' }}>
                        <input
                          type="checkbox"
                          name={lesson.title}
                          id={lesson._id}
                          style={{ marginTop: '5px' }}
                          onClick={(e) => this.handleAddLesson(e, lesson)}
                        />
                      </div>
                    </div>
                  )
                })}
                </div>

                </div>
              </div>

              <div className="seven wide column">
                <div className="renshu-container with-shadow">
                  <h3>Course Lessons</h3>
                    <ul style={{ listStyle: 'none' }}>
                    {lessonsList}
                    </ul>
                </div>
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button
                      onClick={this.goBack}
                      className="ui secondary button"
                      style={{ width: '40%', marginRight: '50px' }}
                    >
                      Back
                    </button>
                    <button
                      onClick={this.saveAndContinue}
                      className="ui violet button"
                      style={{ width: '40%' }}
                    >
                      Next
                    </button>
                  </div>
              </div>

              </div>
    )
  }
}

export default EditLessons
