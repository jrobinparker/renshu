import React from 'react';
import TitleAndDesc from './TitleAndDesc';
import MainContent from './MainContent';
import Video from './Video';
import FlashCardBuilder from './FlashCardBuilder';
import ReviewLesson from './ReviewLesson';
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
    level: '',
    youtubeURL: '',
    flashCards: []
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
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

  handleOnChangeDesc = data => {
    this.setState({
      mainContent: data
    })
  }

  handleOnChangeCard = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddDeck = (newDeck) => {
    this.setState({
      flashCards: this.state.flashCards.concat(newDeck),
    })
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
  }

  handleRemoveCard = key => {
      this.setState({
        flashCards: this.state.flashCards.filter(i => i !== key)
      })
    }

  handleOnSubmit = e => {
    e.preventDefault()
    const lessonData = {
      title: this.state.title,
      level: this.state.level,
      description: this.state.description,
      youtubeURL: this.state.youtubeURL,
      flashCards: this.state.flashCards,
      author: this.props.profile.handle,
      authorId: this.props.auth.user.id
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
                  flashCards={this.state.flashCards}
                />
      case 5:
        return <ReviewLesson
                  prevStep={this.prevStep}
                  lesson={this.state}
                  onSubmit={this.handleOnSubmit}
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
