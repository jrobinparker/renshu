import React from 'react';

const LessonLikeButton = props => {
    return (
        <i className="thumbs up outline icon" onClick={props.onClick}>
          {props.likesCount}
        </i>
    )
}

export default LessonLikeButton
