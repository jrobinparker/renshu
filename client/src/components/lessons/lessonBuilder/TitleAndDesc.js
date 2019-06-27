import React from 'react';
import LevelBadge from '../../shared/LevelBadge';
import { connect } from 'react-redux';
import '../lessons.css'

class TitleAndDesc extends React.Component {
  state = {
    titleError: false,
    descriptionError: false,
    levelError: false
  }


  saveAndContinue = e => {
    e.preventDefault()

    if (!this.props.title) {
      this.setState({
        titleError: true
      })
    }

    if (!this.props.description) {
      this.setState({
        descriptionError: true
      })
    }

    if (!this.props.level) {
      this.setState({
        levelError: true
      })
    }

    if (this.props.title) {
      this.setState({
        titleError: false
      })
    }

    if (this.props.description) {
      this.setState({
        descriptionError: false
      })
    }

    if (this.props.level) {
      this.setState({
        levelError: false
      })
    }

    if (this.props.title && this.props.description && this.props.level) {
      this.props.nextStep()
    }
  }

  render() {
    return (
      <div className="lesson-form with-shadow">
      <h3>Lesson Builder</h3>
      {this.state.titleError === true ? (
        <div className="ui error message">Lesson title cannot be blank!</div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {this.state.levelError === true ? (
        <div className="ui error message">Lesson level cannot be blank!</div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {this.state.descriptionError === true ? (
        <div className="ui error message">Lesson description cannot be blank!</div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <form className="ui form">
        <div className="field">
          <label>Lesson Title</label>
          <input type="text" name="title" value={this.props.title} onChange={this.props.handleOnChange} />
        </div>
        <br />

        <div className="field">
        <label>JLPT Level</label>
          <select onChange={this.props.handleOnChange} name="level" style={{ width: '70%', display: 'inline-block', marginRight: '15px' }}>
            <option value="" disabled selected>Select a JLPT Level</option>
            <option name="level">N5</option>
            <option name="level">N4</option>
            <option name="level">N3</option>
            <option name="level">N2</option>
            <option name="level">N1</option>
          </select>
            <LevelBadge level={this.props.level || "Select N1 - N5"} style={{ width: '10%', display: 'inline-block' }}/>

        </div>
        <br />

        <div className="field">
          <label>Description</label>
          <textarea rows="3" name="description" value={this.props.description} onChange={this.props.handleOnChange} ></textarea>
        </div>
        <br />

        <button onClick={this.saveAndContinue} className="ui violet button" style={{ width: '100%' }}>Next</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(TitleAndDesc);
