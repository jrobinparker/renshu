import React from 'react';

const LessonFeaturesBar = props => {
  return (
    <div>
        {props.video ? (
          <div className="ui purple button" onClick={props.showVideoModal} style={{ marginBottom: '10px', width: '98%' }}>
            <i className="video icon lesson-feature-icon-video" />
            video
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {props.flashCards.length === 0 || !props.flashCards ? (
          <React.Fragment></React.Fragment>
        ) : (
          <div className="ui purple button" onClick={props.showFlashCardModal}>
            <i className="clone outline icon lesson-feature-icon-cards" />
            flash cards ({props.flashCards.length} cards)
          </div>
        )}
    </div>
  )
}

export default LessonFeaturesBar
