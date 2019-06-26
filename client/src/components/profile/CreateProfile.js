import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import classnames from 'classnames';


class CreateProfile extends React.Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    location: '',
    bio: '',
    level: '',
    interests: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = e => {
    e.preventDefault()
    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      bio: this.state.bio,
      level: this.state.level,
      interests: this.state.interests,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(profileData, this.props.history)
  }

  render() {
    const { displaySocialInputs } = this.state
    const { errors } = this.props
    let errorTextHandle, errorTextLevel, socialInputs

    if (errors.handle) {
      errorTextHandle = (
        <div className="ui error message">
          <div className="header">{errors.handle}</div>
        </div>
      )
    }

    if (errors.level) {
      errorTextLevel = (
        <div className="ui error message">
          <div className="header">{errors.level}</div>
          <p>Unsure of your JLPT level? Level 5 is for beginners, while level 1 is for those with fluent proficiency.</p>
          <p><a href="https://www.jlpt.jp/e/about/levelsummary.html" target="_blank" rel="noopener noreferrer">Learn more here!</a></p>
        </div>
      )
    }

    if (displaySocialInputs) {
      socialInputs = (
        <React.Fragment>
        <div class="ui message">
          <div class="header">Please enter the entire URL of each account.</div>
        </div>
        <div className="field">
        <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            onChange={this.handleOnChange}
            value={this.state.twitter}
          />
        </div>
        <div className="field">
        <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            onChange={this.handleOnChange}
            value={this.state.facebook}
          />
        </div>
        <div className="field">
        <label>YouTube</label>
          <input
            type="text"
            name="youtube"
            placeholder="YouTube"
            onChange={this.handleOnChange}
            value={this.state.youtube}
          />
        </div>
        <div className="field">
        <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            onChange={this.handleOnChange}
            value={this.state.linkedin}
          />
        </div>
        <div className="field" style={{ marginBottom: '10px' }}>
        <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            onChange={this.handleOnChange}
            value={this.state.instagram}
          />
        </div>
        </React.Fragment>
      )
    }

    return (
      <div className="ui container renshu-container with-shadow" style={{ width: "60%", margin: "0 auto" }}>
      <h3>Create Your Profile</h3>
        {errorTextHandle}
        {errorTextLevel}
        <form className="ui form" onSubmit={this.handleOnSubmit}>
        <div className={classnames('field', {
          'field error': errors.handle
        })}>
            <label>Username</label>
            <input
              type="text"
              name="handle"
              placeholder="Handle"
              onChange={this.handleOnChange}
              value={this.state.handle}
            />
          </div>
          <div className="field">
            <label>Where are you from?</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={this.handleOnChange}
              value={this.state.location}
            />
          </div>
          <div className="field">
            <label>About me</label>
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              onChange={this.handleOnChange}
              value={this.state.bio}
            />
          </div>
          <div className="field">
            <label>My interests</label>
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              onChange={this.handleOnChange}
              value={this.state.interests}
            />
          </div>
          <div className={classnames('field', {
            'field error': errors.level
          })}>
          <label>JLPT Level</label>
            <select onChange={this.handleOnChange} name="level" style={{ width: '70%', display: 'inline-block', marginRight: '15px' }}>
              <option value="" disabled selected>Select a JLPT Level</option>
              <option name="level">N5</option>
              <option name="level">N4</option>
              <option name="level">N3</option>
              <option name="level">N2</option>
              <option name="level">N1</option>
            </select>
          </div>

            <button type="button" className="ui purple button" style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} onClick={() => {this.setState(prevState => ({
              displaySocialInputs: !prevState.displaySocialInputs
            }))}}>Add Social Network Links</button>
            <div>
              {socialInputs}
            </div>
            <button type="submit" className="ui violet button" style={{ width: "100%" }}>Create Profile</button>

        </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
