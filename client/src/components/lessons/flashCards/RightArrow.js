import React from 'react';

const RightArrow = props => {
  return (
    <div className="nextArrow" onClick={props.goToNextCard} style={{ cursor: 'pointer' }}>
      <i className="arrow circle right icon" aria-hidden="true"></i>
    </div>
  )
}

export default RightArrow
