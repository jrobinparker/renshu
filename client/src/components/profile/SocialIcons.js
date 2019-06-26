import React from 'react';

const SocialIcons = props => {
  let fb
  let ig
  let linkedin
  let twitter
  let yt

  if (props.facebook) {
    fb = <a href={props.facebook} style={{ color: 'darkblue' }} target="_blank" rel="noopener noreferrer"><i className="facebook icon" /></a>
  }

  if (props.instagram) {
    ig = <a href={props.instagram} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer"><i className="instagram icon" /></a>
  }

  if (props.linkedin) {
    linkedin = <a href={props.linkedin} style={{ color: 'blue' }} target="_blank" rel="noopener noreferrer"><i className="linkedin icon" /></a>
  }

  if (props.twitter) {
    twitter = <a href={props.twitter} style={{ color: 'lightblue' }} target="_blank" rel="noopener noreferrer"><i className="twitter icon" /></a>
  }

  if (props.youtube) {
    yt = <a href={props.youtube} style={{ color: 'red' }} target="_blank" rel="noopener noreferrer"><i className="youtube icon" /></a>
  }


  return (
    <div className="profile-social">
      {fb}
      {ig}
      {linkedin}
      {twitter}
      {yt}
    </div>
  )
}

export default SocialIcons
