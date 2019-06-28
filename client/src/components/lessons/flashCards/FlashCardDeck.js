import React from 'react';
import FlashCard from './FlashCard';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

class FlashCardDeck extends React.Component {
  state = {
    cards: [...this.props.cards],
    currentIndex: 0
  }

  goToPrevCard = () => {
    if (this.state.currentIndex >= 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }))
    } else {
      this.setState({
        currentIndex: this.state.cards.length - 1
      })
    }
  }

  goToNextCard = () => {
    if (this.state.currentIndex === this.state.cards.length - 1) {
      this.setState({
          currentIndex: 0
        })
    } else {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }))
    }
  }

  render() {
    let currentCard
    const cards = this.state.cards.map((card, i) => {
      if (this.state.currentIndex === i) {
        currentCard = <FlashCard key={i} front={card.front} back={card.back} />
      }
    })
    return (
      <div>
          {currentCard}
        <div className="deckNav">
          <LeftArrow goToPrevCard={this.goToPrevCard} />
          <RightArrow goToNextCard={this.goToNextCard} />
        </div>
      </div>
    )
  }
}

export default FlashCardDeck
