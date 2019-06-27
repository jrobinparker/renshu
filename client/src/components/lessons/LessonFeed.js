import React from 'react';
import LessonItem from './LessonItem';
import './lessons.css'

class LessonFeed extends React.Component {
  state = {
    filter: ''
  }

  render() {
    const { lessons } = this.props

    let lessonList

    if (this.state.filter === '') {
      lessonList = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson} user={this.props.user} />)
    }

    if (this.state.filter === 'N5') {
      lessonList = lessons
        .filter(lesson => lesson.level === 'N5')
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === 'N4') {
      lessonList = lessons
        .filter(lesson => lesson.level === 'N4')
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === 'N3') {
      lessonList = lessons
        .filter(lesson => lesson.level === 'N3')
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === 'N2') {
      lessonList = lessons
        .filter(lesson => lesson.level === 'N2')
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === 'N1') {
      lessonList = lessons
        .filter(lesson => lesson.level === 'N1')
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === '') {
      lessonList = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson} user={this.props.user} />)
    }

    if (this.state.filter === 'flashCards') {
      lessonList = lessons
        .filter(lesson => lesson.flashCards.length >= 1)
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    if (this.state.filter === 'video') {
      lessonList = lessons
        .filter(lesson => lesson.youtubeURL)
        .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={this.props.user} />)
    }

    return (
      <div className="ui grid">
        <div className="three wide column">
            <h3>Lesson filters</h3>
            <div className="ui compact menu" style={{ marginBottom: '10px' }}>
              <div className="ui simple dropdown item">
                JLPT (N1 - N5)
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
            <div className="ui compact menu" style={{ marginBottom: '10px' }}>
              <div className="ui simple dropdown item">
                Lesson features
                <i className="dropdown icon" />
                <div className="menu">
                  <div className="item" onClick={() => this.setState({ filter: '' })}>All</div>
                  <div className="item" onClick={() => this.setState({ filter: 'flashCards' })}>Flash Cards</div>
                  <div className="item" onClick={() => this.setState({ filter: 'video' })}>Video</div>
                </div>
              </div>
            </div>
      </div>
      <div className="thirteen wide column">
          <div className="ui cards">
            {lessonList}
          </div>
        </div>
      </div>
    )
  }
}

export default LessonFeed;
