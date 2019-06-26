import React from 'react';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';

import { Link } from 'react-router-dom';
import Spinner from '../shared/Spinner';
import LevelBadge from '../shared/LevelBadge';
import SocialIcons from './SocialIcons';
import './profile.css'

class Profile extends React.Component {

  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle)
  }


  render() {
    let profile, profileInterests

    if (!this.props.profile.profile) {
      profile = <Spinner/>
    } else {
      profileInterests = this.props.profile.profile.interests.map(int => {
        return (
          <div className="profile-interests">
            {int}
          </div>
        )
      })
      profile = (
        <div className="ui grid" style={{ marginBottom: '20px' }}>
            <div className="eight wide column">
                  <div className="image profile-image">
                  <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="profile avatar"
                  />
                  </div>
            </div>

            <div className="eight wide column">


            <div className="content profile-content with-shadow" >
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ display: 'inline-block', marginRight: '10px' }}>{this.props.profile.profile.handle}</h2>
                <LevelBadge level={this.props.profile.profile.level} style={{ display: 'inline-block' }} />
                <Link to={`/profile/${this.props.profile.profile.handle}/edit`}>
                  <i className="edit outline icon profile-edit-link" style={{ fontSize: '1.75rem' }} />
                </Link>

              </div>

              <div className="meta" style={{ marginBottom: '20px' }}>
                <h4 className="date">Location: {this.props.profile.profile.location}</h4>
              </div>

              <div>
                <h4>Interests:</h4>
                {profileInterests}
                <h4>About me</h4>
                  {this.props.profile.profile.bio}
                {this.props.profile.profile.social ? (
                  <React.Fragment>
                    <h4>Find me online at...</h4>
                    <SocialIcons facebook={this.props.profile.profile.social.facebook}
                    instagram={this.props.profile.profile.social.instagram}
                    linkedin={this.props.profile.profile.social.linkedin}
                    twitter={this.props.profile.profile.social.twitter}
                    youtube={this.props.profile.profile.social.youtube}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}

              </div>

            </div>
          </div>
          </div>
      )
    }


    return (
      <div>
          {profile}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
