import React from 'react';
import './level-badge.css';

const LevelBadge = props => {
  if (props.level === 'N5' ) {
    return (
      <div className="level-badge n5">
        {props.level}
      </div>
    )
  }

  if (props.level === 'N4' ) {
    return (
      <div className="level-badge n4">
        {props.level}
      </div>
    )
  }

  if (props.level === 'N3' ) {
    return (
      <div className="level-badge n3">
        {props.level}
      </div>
    )
  }

  if (props.level === 'N2' ) {
    return (
      <div className="level-badge n2">
        {props.level}
      </div>
    )
  }

  if (props.level === 'N1' ) {
    return (
      <div className="level-badge n1">
        {props.level}
      </div>
    )
  }

  if (props.level === '' ) {
    return (
      <React.Fragment></React.Fragment>
    )
  }


  return (
    <div className="level-badge">
      {props.level}
    </div>
  )
}

export default LevelBadge
