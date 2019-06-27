import React from 'react';
import ReactPlayer from 'react-player';
import Spinner from '../../shared/Spinner';

class Video extends React.Component {
  state = {
    url: '',
    loading: false,
    displayPlayer: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.youtubeURL !== this.props.youtubeURL) {
      this.setState({
        url: this.props.youtubeURL,
        loading: !this.state.loading,
        displayPlayer: !prevState.displayPlayer
      })
    }
  }

  saveAndContinue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    let spinner
    let player
    if (this.state.loading) {
      spinner = <Spinner style={{ margin: '0 auto' }}/>
    }
    if (this.state.displayPlayer) {
      player = <ReactPlayer url={this.state.url} style={{ margin: '0 auto' }} onReady={() => this.setState({ loading: !this.state.loading })}/>
    }
    return (
      <div className="lesson-form with-shadow">
      <form className="ui form">

        <div className="field">
          <h3 style={{ marginBottom: '1px' }}>Video
            <i className="youtube icon" style={{ color: 'red', marginLeft: '10px', marginRight: '5px' }} />
            <i className="facebook icon" style={{ color: 'darkblue', marginRight: '5px' }}/>
            <i className="twitch icon" style={{ color: 'purple', marginRight: '5px' }} />
            <i className="vimeo icon" style={{ color: 'blue', marginRight: '5px' }} />
            <i className="soundcloud icon" style={{ color: 'orange', marginRight: '5px' }} />
          </h3>
          <small style={{ color: 'gray' }}>YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion supported!</small>
          <input type="text" name="youtubeURL" value={this.props.youtubeURL} placeholder='YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, or DailyMotion URL' onChange={this.props.handleOnChange} style={{ marginTop: '10px'}} />
        </div>
        {spinner}
        {player}
        <br />

        <div style={{ textAlign: 'center' }}>
          <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
          <button onClick={this.saveAndContinue} className="ui violet button" style={{ width: '40%' }}>Next</button>
        </div>

      </form>
      </div>
    )
  }
}

export default Video
