import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentProfile } from '../../../actions/profileActions';
import TitleAndDesc from './TitleAndDesc';


class AddCourse extends React.Component {
  state = {
    currentStep: 1,
    title: '',
    description: '',
    level: '',
    lessons: [],
    author: ''
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
   // Make sure currentStep is set to something reasonable
    if (currentStep >= 2) {
     currentStep = 2;
    } else {
      currentStep = currentStep + 1;
    }

   this.setState({
     currentStep: currentStep
   });
  }

  prevStep = () => {
   let currentStep = this.state.currentStep;
   if (currentStep <= 1) {
     currentStep = 1;
   } else {
     currentStep = currentStep - 1;
   }

   this.setState({
     currentStep: currentStep
   });
 }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addLessons = lessons => {
    const newLessons = lessons
    this.setState({
      lessons: this.state.lessons.concat(newLessons)
    })
  }

  updateLessonOrder = newLessons => {
    this.setState({
      lessons: [...newLessons]
    })
  }

  handleOnSubmit = e => {
    e.preventDefault()
    const courseData = {
      title: this.state.title,
      level: this.state.level,
      description: this.state.description,
      lessons: this.state.lessons,
      author: this.props.profile.handle,
      authorId: this.props.auth.user.id
    }
    this.props.addCourse(courseData)
    this.nextStep()
  }

  render() {
    const { title, description, level } = this.state
    switch (this.state.currentStep) {
      case 1:
        return <TitleAndDesc
                  nextStep={this.nextStep}
                  handleOnChange={this.handleOnChange}
                  title={title}
                  description={description}
                  level={level}
                />
      default:
        return <TitleAndDesc
                nextStep={this.nextStep}
                handleOnChange={this.handleOnChange}
                title={title}
                description={description}
                level={level}
              />
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(AddCourse)
