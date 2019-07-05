import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentProfile } from '../../../actions/profileActions';
import { getCourse, editCourse } from '../../../actions/courseActions';
import TitleAndDesc from './TitleAndDesc';
import EditLessons from './EditLessons';
import ReorderLessons from './ReorderLessons';
import ReviewCourse from './ReviewCourse';

class EditCourse extends React.Component {
  state = {
    currentStep: 1,
    title: '',
    description: '',
    level: '',
    lessons: [],
    courseLessons: [],
    newLessons: [],
    author: ''
  }

  componentDidMount() {
    this.props.getCurrentProfile()
    this.props.getCourse(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course || nextProps.courseLessons || nextProps.lessons) {
      this.setState({
        title: nextProps.course.title,
        description: nextProps.course.description,
        level: nextProps.course.level,
        lessons: nextProps.lessons,
        courseLessons: nextProps.courseLessons,
        author: nextProps.course.author
      })
    }
  }


  nextStep = () => {
    let currentStep = this.state.currentStep;
   // Make sure currentStep is set to something reasonable
    if (currentStep >= 5) {
     currentStep = 5;
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
      courseLessons: [...newLessons]
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
      id: this.props.course._id,
      title: this.state.title,
      level: this.state.level,
      description: this.state.description,
      lessons: this.state.lessons,
      author: this.props.profile.handle,
      authorId: this.props.auth.user.id
    }
    this.props.editCourse(courseData.id, courseData)
    this.nextStep();
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
      case 2:
        return <EditLessons
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  lessons={this.state.lessons}
                  courseLessons={this.state.courseLessons}
                  addLessons={this.addLessons}
                />
      case 3:
        return <ReorderLessons
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  lessons={this.state.courseLessons}
                  updateLessonOrder={this.updateLessonOrder}
                />
      case 4:
        return <ReviewCourse
                  prevStep={this.prevStep}
                  course={this.state}
                  onSubmit={this.handleOnSubmit}
                />
      case 5:
        return <Redirect
                push to={{
                  pathname: '/dashboard',
                  state: {
                    newCourse: false,
                    newLesson: false,
                    editedCourse: true,
                    editedLesson: false
                 }}} />
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
  profile: state.profile.profile,
  course: state.course.course,
  courseLessons: state.course.courseLessons,
  lessons: state.lesson.lessons
})

export default connect(mapStateToProps, { getCourse, editCourse, getCurrentProfile })(EditCourse)
