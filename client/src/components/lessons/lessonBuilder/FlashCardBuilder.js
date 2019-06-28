import React from 'react';

class FlashCardBuilder extends React.Component {

  state = {
    flashCards: [],
    newCardFront: '',
    newCardBack: '',
    newCards: '',
    saved: false,
    editDeck: false,
    editCardKey: 0,
    editCardFront: '',
    editCardBack: ''
  }

  getDeck = props => {
    if (this.props.deck) {
      this.setState({
        flashCards: this.state.flashCards.concat(this.props.deck)
      })
    }
  }

  componentDidMount() {
    this.getDeck()
  }

  handleOnChangeCard = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNewCard = e => {
    e.preventDefault()
    const newCard = { front: this.state.newCardFront, back: this.state.newCardBack }
    this.setState({
      flashCards: this.state.flashCards.concat(newCard),
      newCardFront: '',
      newCardBack: ''
    })
  }

  handleEditCard = e => {
    e.preventDefault()
    const editedCard = { front: this.state.editCardFront, back: this.state.editCardBack, key: this.state.editCardKey }
    this.setState(state => ({
      flashCards: this.state.flashCards.map((card, i) => {
      if (i === this.state.editCardKey) {
        return {front: editedCard.front, back: editedCard.back}
      } else {
        return card
      }
    }),
      editCardKey: '',
      editingCard: '',
      editCardFront: '',
      editCardBack: '',
      editDeck: !this.state.editDeck
    }))
  }

  removeCard = () => {
      this.setState({
        flashCards: this.state.flashCards.filter((card, i) => i !== this.state.editCardKey),
        editCardKey: '',
        editingCard: '',
        editCardFront: '',
        editCardBack: '',
        editDeck: !this.state.editDeck
        })
  }

  saveDeck = () => {
    const newDeck = this.state.flashCards
    this.setState({
      saved: !this.state.saved
    })
    this.props.handleAddDeck(newDeck)
  }

  saveAndContinue = e => {
    e.preventDefault()
    this.saveDeck()
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }


  render() {
    let deckPreview
    let saveDeckButton
    if (this.state.flashCards && this.state.flashCards.length >  0) {
       const { flashCards } = this.state

       deckPreview = flashCards.map((card, i) => {
         return (
           <div key={card} className="cardBuilderCard" style={{ display: 'inline-block', margin: '5px 10px 10px 5px', padding: '10px', width: '25%'  }}
            >
           {this.state.editDeck && this.state.editCardKey === i ? (
             <div>
              <h3>Card {i + 1} <i className="close icon" style={{ color: 'red' }} onClick={this.removeCard}></i></h3>
              <div className="field">
               <input type="text" name="editCardFront"
               value={this.state.editCardFront} placeholder={card.front} onChange={this.handleOnChangeCard} />
              </div>
              <div className="field">
               <input type="text" name="editCardBack" value={this.state.editCardBack} placeholder={card.back} onChange={this.handleOnChangeCard} />
              </div>
                <button className="ui secondary button" style={{ display: 'inline-block' }} onClick={() => this.setState({ editDeck: !this.state.editDeck})}>Cancel</button>
               <button className="ui teal button" style={{ display: 'inline-block' }} onClick={this.handleEditCard}>Save</button>
             </div>
           ) : (
             <div>
               <h3>Card {i + 1}</h3>
               <p>Front: {card.front}</p>
               <p>Back: {card.back}</p>
               <div className="ui teal button" style={{ width: '100%' }} onClick={() =>  this.setState({ editDeck: !this.state.editDeck, editCardKey: i  })}>
                Edit Card
                </div>
              </div>
           )}
           </div>
         )
       })
       if (!this.state.saved) {
         saveDeckButton = <button onClick={this.saveDeck} className="ui teal button" style={{ width: '85%', marginBottom: '5px' }}>Save Deck</button>
       } else {
         saveDeckButton = <button onClick={this.saveDeck} className="ui teal button" style={{ width: '85%', marginBottom: '5px' }}>Saved!</button>
       }
     }
    return (
      <div className="lesson-form with-shadow">
      <form className="ui large form">
        <h1>Create a flash card deck</h1>
        <div className="two fields">
          <div className="field">
            <label>Front</label>

            <input type="text" name="newCardFront" value={this.state.newCardFront} onChange={this.handleOnChangeCard} />
          </div>
          <div className="field">
            <label>Back</label>

            <input type="text" name="newCardBack" value={this.state.newCardBack} onChange={this.handleOnChangeCard} />
          </div>
          <i className="plus circle icon" onClick={this.handleNewCard} style={{ color: 'green', fontSize: '2rem', position: 'relative', top: '35px' }}></i>
        </div>
              <div style={{ textAlign: 'center' }}>
                {deckPreview}
              </div>

        <div style={{ textAlign: 'center' }}>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
          <button onClick={this.saveAndContinue} className="ui violet button" style={{ width: '40%' }}>Next</button>
        </div>
      </form>
      </div>
    )
  }
}

export default FlashCardBuilder
