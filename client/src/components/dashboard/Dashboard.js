import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import DashboardProfile from './DashboardProfile';
import Spinner from '../shared/Spinner';
import LevelBadge from '../shared/LevelBadge';
import './dashboard.css';

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
            <DashboardProfile profile={profile} />
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
            <div className="six wide column">
              <div className="dashboard-list" id="with-shadow">
                <h3 style={{ marginBottom: '10px '}}>Completed Lessons</h3>
                <Link className="ui violet button" to="/dashboard" style={{ width: '100%' }}>View all completed lessons</Link>
              </div>
            </div>
            <div className="six wide column">
              <div className="dashboard-list" id="with-shadow">
                <h3 style={{ marginBottom: '10px '}}>Completed Courses</h3>
                <Link className="ui violet button" to="/dashboard" style={{ width: '100%' }}>View all completed courses</Link>
              </div>
            </div>

        </div>


    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
