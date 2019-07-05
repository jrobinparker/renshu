import React from 'react';
import TitleAndDesc from './TitleAndDesc';
import MainContent from './MainContent';
import Video from './Video';
import FlashCardBuilder from './FlashCardBuilder';
import ReviewLesson from './ReviewLesson';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { editLesson, getLesson } from '../../../actions/lessonActions';
import { getCurrentProfile } from '../../../actions/profileActions';

class EditLesson extends React.Component {
  state = {
    currentStep: 1,
    title: '',
    description: '',
    mainContent: '',
    level: '',
    youtubeURL: '',
    flashCards: [],
    author: ''
  }

  componentDidMount() {
    this.props.getCurrentProfile()
    this.props.getLesson(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lesson) {
      if (nextProps.lesson.authorId !== this.props.auth.user.id) {
        this.props.history.push(`/lesson/${this.props.match.params.id}`)
      } else {
        this.setState({
          title: nextProps.lesson.title,
          description: nextProps.lesson.description,
          mainContent: nextProps.lesson.mainContent,
          level: nextProps.lesson.level,
          youtubeURL: nextProps.lesson.youtubeURL,
          flashCards: nextProps.lesson.flashCards,
          author: nextProps.lesson.author
        })
    }
  }}

  nextStep = () => {
    let currentStep = this.state.currentStep;
   // Make sure currentStep is set to something reasonable
    if (currentStep >= 6) {
     currentStep = 6;
    } else {
      currentStep = currentStep + 1;
    }

   this.setState({
     currentStep: currentStep
   });
   console.log(this.state)
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

  handleOnChangeCard = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.newCardFront, this.state.newCardBack)
  }

  handleAddDeck = (newDeck) => {
    const updatedDeck = newDeck
    this.setState({
      flashCards: [...updatedDeck],
    })
    console.log('parent component flashCards state is: ', this.state.flashCards)
  }

  handleCardUpdate = (editedCard) => {
    const newCard = { front: editedCard.front, back: editedCard.back, key: editedCard.key }
    this.setState(state => ({
      flashCards: this.state.flashCards.map((card, i) => {
      if (i === newCard.key) {
        return {front: newCard.front, back: newCard.back}
      } else {
        return card
      }
    })
    })
    )
    console.log(this.state.flashCards)
  }

  handleRemoveCard = key => {
      this.setState({
        flashCards: this.state.flashCards.filter(i => i !== key)
      })
      console.log(this.state.flashCards)
    }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const lessonData = {
      id: this.props.lesson._id,
      title: this.state.title,
      level: this.state.level,
      mainContent: this.state.mainContent,
      description: this.state.description,
      youtubeURL: this.state.youtubeURL,
      flashCards: this.state.flashCards,
      author: this.props.profile.handle
    }
    this.props.editLesson(lessonData.id, lessonData)
    this.nextStep()
  }

  render() {
    const { title, description } = this.state
      switch (this.state.currentStep) {
        case 1:
          return <TitleAndDesc
                    nextStep={this.nextStep}
                    handleOnChange={this.handleOnChange}
                    title={this.state.title}
                    level={this.state.level}
                    description={this.state.description}
                    id={this.props.lesson._id}
                  />
        case 2:
          return <MainContent
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleOnChangeDesc={this.handleOnChangeDesc}
                    mainContent={this.state.mainContent}
                  />
        case 3:
          return <Video
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleOnChange={this.handleOnChange}
                    youtubeURL={this.state.youtubeURL}
                  />
        case 4:
          return <FlashCardBuilder
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleOnChangeCard={this.handleOnChangeCard}
                    handleAddDeck={this.handleAddDeck}
                    deck={this.state.flashCards}
                  />
        case 5:
          return <ReviewLesson
                    prevStep={this.prevStep}
                    lesson={this.state}
                    onSubmit={this.handleOnSubmit}
                  />
        case 6:
          return <Redirect
                push to={{
                  pathname: '/dashboard',
                  state: {
                    newCourse: false,
                    newLesson: false,
                    editedCourse: false,
                    editedLesson: true
                  }
                }} />
        default:
        return <TitleAndDesc
                  nextStep={this.nextStep}
                  handleOnChange={this.handleOnChange}
                  title={this.state.title}
                  level={this.state.level}
                  description={this.state.description}
                  id={this.props.lesson._id}
                />
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  lesson: state.lesson.lesson
})

export default connect(mapStateToProps, { editLesson, getLesson, getCurrentProfile })(EditLesson)
