import React from 'react';
import FlashCardPreviewModal from './modals/FlashCardPreviewModal';
import VideoPreviewModal from './modals/VideoPreviewModal';
import MainContentPreviewModal from './modals/MainContentPreviewModal';

class ReviewLesson extends React.Component {
  state = {
    showVideoModal: false,
    showFlashCardModal: false,
    showMainContentModal: false
  }

  saveAndContinue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  showVideoModal = e => {
    e.preventDefault()
    this.setState({
      showVideoModal: !this.state.showVideoModal
    })
  }

  closeVideoModal = e => {
    e.preventDefault()
    this.setState({
      showVideoModal: !this.state.showVideoModal
    })
  }

  showFlashCardModal = e => {
    e.preventDefault()
    this.setState({
      showFlashCardModal: !this.state.showFlashCardModal
    })
  }

  closeFlashCardModal = e => {
    e.preventDefault()
    this.setState({
      showFlashCardModal: !this.state.showFlashCardModal
    })
  }

  showMainContentModal = e => {
    e.preventDefault()
    this.setState({
      showMainContentModal: !this.state.showMainContentModal
    })
  }

  closeMainContentModal = e => {
    e.preventDefault()
    this.setState({
      showMainContentModal: !this.state.showMainContentModal
    })
  }

  render() {
    const { title, description, level, mainContent, youtubeURL, flashCards } = this.props.lesson
    let video, lessonContent, deck

    if (youtubeURL) {
      video = (
        <React.Fragment>
          <div className="ui purple button" onClick={this.showVideoModal}>Preview Video</div>
        </React.Fragment>
      )
    }

    if (mainContent) {
      lessonContent = (
        <React.Fragment>
          <div className="ui purple button" onClick={this.showMainContentModal}>Preview Lesson Content</div>
        </React.Fragment>
      )
    }

    if (flashCards && flashCards.length > 0) {
      deck = (
        <React.Fragment>
          <div className="ui purple button" onClick={this.showFlashCardModal}>Preview Flash Cards ({flashCards.length})</div>
        </React.Fragment>
      )
    }

    return (
      <div className="lesson-form with-shadow">
        <form className="ui form" onSubmit={this.props.onSubmit}>
          <h2>Review Lesson</h2>
          <h3>Lesson Title: {title}</h3>
          <h3>Level: {level}</h3>
          <h3>Description: {description}</h3>

          <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
            {video}
            {lessonContent}
            {deck}
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
            <button className="ui violet button" style={{ width: '40%' }}>Save</button>
          </div>

        </form>
        {this.state.showVideoModal ? (
          <VideoPreviewModal video={youtubeURL} closeModal={this.closeVideoModal} />

        ) : (
          <React.Fragment>{}</React.Fragment>
        )}
        {this.state.showFlashCardModal ? (
          <FlashCardPreviewModal cards={flashCards} deckTitle={title} closeModal={this.closeFlashCardModal} />
        ) : (
          <React.Fragment>{}</React.Fragment>
        )}
        {this.state.showMainContentModal ? (
          <MainContentPreviewModal content={mainContent} closeModal={this.closeMainContentModal} />
        ) : (
          <React.Fragment>{}</React.Fragment>
        )}
      </div>

    )
  }
}

export default ReviewLesson
