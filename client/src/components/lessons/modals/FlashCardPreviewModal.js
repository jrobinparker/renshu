import React from 'react';
import ReactDOM from 'react-dom';
import FlashCardDeck from '../flashCards/FlashCardDeck';

class FlashCardPreviewModal extends React.Component {
  render() {
  return ReactDOM.createPortal(
    <div onClick={this.props.closeModal} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">{this.props.deckTitle} - Flash Cards</div>
          <FlashCardDeck cards={this.props.cards} />
      </div>
    </div>,
    document.querySelector('#flash-card-modal')
    )
  }
}

export default FlashCardPreviewModal;
