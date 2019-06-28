import React from 'react';

class FlashCard extends React.Component {
  state = {
    flipCard: false,
  }

  render() {
    const { front, back } = this.props

    return (
      <React.Fragment>
      <div className="card" onClick={() => this.setState({ flipCard: !this.state.flipCard })} style={{ cursor: 'pointer' }}>
        {!this.state.flipCard ? (
          <div>{front}</div>
        ) : (
          <div>{back}</div>
        )}
      </div>
      </React.Fragment>
    )
  }
}

export default FlashCard
