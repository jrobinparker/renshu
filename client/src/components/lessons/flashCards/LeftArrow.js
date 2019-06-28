import React from 'react';

const LeftArrow = props => {
  return (
    <div className="prevArrow" onClick={props.goToPrevCard} style={{ cursor: 'pointer' }}>
      <i className="arrow circle left icon" aria-hidden="true"></i>
    </div>
  )
}

export default LeftArrow
