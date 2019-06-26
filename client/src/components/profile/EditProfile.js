import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import classnames from 'classnames';


class CreateProfile extends React.Component {
  state = {
    displaySocialInputs: false,
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

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile
      this.setState({
        handle: profile.handle,
        location: profile.location,
        level: profile.level,
        bio: profile.bio,
        interests: profile.interests.join(',')
      })
    }

    if (nextProps.profile.profile.social) {
      const profile = nextProps.profile.profile
      this.setState({
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram
      })
    }
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
      level: this.state.level,
      bio: this.state.bio,
      interests: this.state.interests,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(profileData, this.props.history.push('/dashboard'))
  }

  render() {
    const { displaySocialInputs } = this.state
    const { errors } = this.props
    let errorTextHandle, errorTextLevel, socialInputs

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
        <div style={{ marginBottom: '15px' }}>
        <div class="ui message">
          <div class="header">Please enter the entire URL of each account.</div>
        </div>
        <label>Twitter <i class="twitter icon" /></label>
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            onChange={this.handleOnChange}
            value={this.state.twitter}
          />

        <label>Facebook <i className="facebook icon" /></label>
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            onChange={this.handleOnChange}
            value={this.state.facebook}
          />

        <label>YouTube <i class="youtube icon" /></label>
          <input
            type="text"
            name="youtube"
            placeholder="YouTube"
            onChange={this.handleOnChange}
            value={this.state.youtube}
          />

        <label>LinkedIn <i class="linkedin icon" /></label>
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            onChange={this.handleOnChange}
            value={this.state.linkedin}
          />

        <label>Instagram <i className="instagram icon" /></label>
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            onChange={this.handleOnChange}
            value={this.state.instagram}
          />
        </div>
      )
    }

    return (
      <div className="ui container renshu-container with-shadow" style={{ width: '60%' }}>
        <h1>Edit Profile</h1>
        <form className="ui form" onSubmit={this.handleOnSubmit}>
          <div className="field">
            <label>Where are you from?</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={this.handleOnChange}
              value={this.state.location}
            />
            <label>About me</label>
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              onChange={this.handleOnChange}
              value={this.state.bio}
            />
            <label>My interests</label>
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              onChange={this.handleOnChange}
              value={this.state.interests}
            />
            <div className={classnames('field', {
              'field error': errors.level
            })}>
            <label>JLPT Level</label>
              <select onChange={this.handleOnChange} name="level" style={{ width: '70%', display: 'inline-block', marginRight: '15px' }}>
                <option value={this.state.level} disabled selected>{this.state.level}</option>
                <option name="level">N5</option>
                <option name="level">N4</option>
                <option name="level">N3</option>
                <option name="level">N2</option>
                <option name="level">N1</option>
              </select>
            </div>

            <button type="button" className="ui purple button" style={{ marginTop: '15px', marginBottom: '15px', width: '100%' }} onClick={() => {this.setState(prevState => ({
              displaySocialInputs: !prevState.displaySocialInputs
            }))}}>Add/Remove Social Network Links</button>
            <div>
              {socialInputs}
            </div>
            <button type="submit" className="ui violet button" style={{ width: '100%' }}>Edit Profile</button>

          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile))
