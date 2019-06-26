import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../shared/Spinner';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let userProfile

    if (profile === null || loading) {
      userProfile = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        userProfile = (
          <div className="three wide column">
            <h1>welcome {user}!</h1>
          </div>
        )

      } else {
        userProfile = (
          <div className="renshu-container" style={{ width: "50%", marginTop: "20px " }}>
            <h1>ようこそ！</h1>
            <p>You haven't set up a profile yet!</p>
            <p>Click the button below to get started.</p>
            <Link to="/create-profile" className="ui violet button" style={{ width: "100%", marginTop: "20px" }}>
              Create Profile
            </Link>
          </div>
        )

      }
    }

    return (
        <div className="ui centered grid">

            {userProfile}
        </div>


    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
