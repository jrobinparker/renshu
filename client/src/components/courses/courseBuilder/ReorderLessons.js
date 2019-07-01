import React from 'react';
import ReorderLessonsList from './ReorderLessonsList';
import { DragDropContext } from 'react-beautiful-dnd';

class ReorderLessons extends React.Component {
  state = {
    column: {
      id: 'column-1',
      lessons: [...this.props.lessons]
    }

  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result
    let movedLesson
    if (!destination) {
      return
    }

    if (
      destination.index === source.index
    ) {
      return
    }

    const newLessons = Array.from(this.state.column.lessons)
     newLessons.map((lesson, i) => {
       const lessonIndex = String(i)
       if (lessonIndex === draggableId) {
         movedLesson = newLessons[i]
       }
     })

     newLessons.splice(source.index, 1)
     newLessons.splice(destination.index, 0, movedLesson)

      this.setState({
        column: {
          lessons: [...newLessons]
        }
      })
  }

  saveAndContinue = e => {
    e.preventDefault()
    const newLessons = this.state.column.lessons
    this.props.updateLessonOrder(newLessons)
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="lesson-form with-shadow">
        <h1>Reorder Lessons</h1>
            <ReorderLessonsList lessons={this.state.column.lessons} id={this.state.column.id} />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
          <button onClick={this.saveAndContinue} className="ui violet button" style={{ width: '40%' }}>Next</button>
        </div>
        </div>
    </DragDropContext>
      )
  }
}

export default ReorderLessons
