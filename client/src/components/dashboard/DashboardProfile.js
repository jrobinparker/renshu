import React from 'react';
import LevelBadge from '../shared/LevelBadge';
import { Link } from 'react-router-dom';
import './dashboard.css';

const ProfileUserWidget = props => {
    const { profile } = props
    return (
        <div className="ui card">
          <div className="image" style={{ paddingBottom: '15px' }}>
          <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" alt="profile avatar"
          />
          </div>
          <div className="content">
            <div style={{ display: 'inline-block' }}>
              <h4 style={{ display: 'inline-block', marginLeft: '20px' }}><Link to={`/profile/${profile.handle}`}>{profile.handle}</Link></h4>
              <LevelBadge level={profile.level} style={{ display: 'inline-block' }}/>
            </div>
          </div>
      </div>
    )
}

export default ProfileUserWidget
