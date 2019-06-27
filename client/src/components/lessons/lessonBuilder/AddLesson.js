import React from 'react';
import TitleAndDesc from './TitleAndDesc';
import MainContent from './MainContent';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { addLesson } from '../../../actions/lessonActions';
import { getCurrentProfile } from '../../../actions/profileActions';
import '../lessons.css'

class AddLesson extends React.Component {
  state = {
    currentStep: 1,
    title: '',
    description: '',
    mainContent: '',
    level: ''
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
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

  handleOnChangeDesc = data => {
    this.setState({
      mainContent: data
    })
  }

  handleOnSubmit = e => {
    e.preventDefault()
    const lessonData = {
      title: this.state.title,
      level: this.state.level,
      description: this.state.description,
    }
    this.props.addLesson(lessonData)
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
                  level={level}
                  description={description}
                />
      case 2:
        return <MainContent
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleOnChangeDesc={this.handleOnChangeDesc}
                  mainContent={this.state.mainContent}
                />
      default:
        return <TitleAndDesc
                  nextStep={this.nextStep}
                  handleOnChange={this.handleOnChange}
                  title={title}
                  level={level}
                  description={description}
                />
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { addLesson, getCurrentProfile })(withRouter(AddLesson))
