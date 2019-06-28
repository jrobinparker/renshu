import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLesson } from '../../../actions/lessonActions';
import FlashCardPreviewModal from '../modals/FlashCardPreviewModal';
import VideoPreviewModal from '../modals/VideoPreviewModal';
import MainContentDisplay from './MainContentDisplay';
import LessonFeaturesBar from './LessonFeaturesBar';
import LessonDataBar from './LessonDataBar';
import '../lessons.css';
import Moment from 'react-moment';
import LevelBadge from '../../shared/LevelBadge'
import './lesson-content.css'

class LessonContent extends React.Component {
  state = {
    showVideoModal: false,
    showFlashCardModal: false
  }

  componentDidMount() {
    this.props.getLesson(this.props.match.params.id)
  }

  closeMainContentModal = e => {
    e.preventDefault()
    this.setState({
      showMainContentModal: !this.state.showMainContentModal
    })
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



  render() {

    const { lesson } = this.props

    return (
      <div>
        <div className="ui grid">
          <div className="three wide column">
            <div className="ui segments with-shadow">
              <div className="ui segment" style={{ fontSize: '1.25rem' }}>{lesson.title} <LevelBadge level={lesson.level} /></div>
              <div className="ui segment" style={{ fontSize: '1rem' }}>{lesson.description}</div>
              <div className="ui segment"><Link to={`/profile/${lesson.author}`}>{lesson.author}</Link>
              <br />
              <Moment format="MM/DD/YYYY">{lesson.created}</Moment></div>
              <div className="ui horizontal segments" style={{ backgroundColor: 'white', textAlign: 'center' }}>

                <LessonDataBar lesson={lesson} />

              </div>

            </div>
            {lesson.youtubeURL || lesson.flashCards && lesson.flashCards.length >= 1 ? (
              <LessonFeaturesBar video={lesson.youtubeURL} flashCards={lesson.flashCards} showVideoModal={this.showVideoModal} showFlashCardModal={this.showFlashCardModal} />
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>





          <div className="thirteen wide column">
          <div style={{ backgroundColor: 'white' }}>
            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div>
          </div>
            <div className="renshu-container with-shadow" style={{ height: '100%', overflowY: 'scroll', marginTop: '-5px' }} id="content">

            <MainContentDisplay content={lesson.mainContent} />
            </div>

          </div>

        </div>

        {this.state.showVideoModal ? (
          <VideoPreviewModal video={lesson.youtubeURL} closeModal={this.closeVideoModal} />

        ) : (
          <React.Fragment>{}</React.Fragment>
        )}
        {this.state.showFlashCardModal ? (
          <FlashCardPreviewModal cards={lesson.flashCards} deckTitle={lesson.title} closeModal={this.closeFlashCardModal} />
        ) : (
          <React.Fragment>{}</React.Fragment>
        )}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  lesson: state.lesson.lesson
})


export default connect(mapStateToProps, { getLesson })(LessonContent);
