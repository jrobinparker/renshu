import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getLessons } from '../../actions/lessonActions';
import DashboardProfile from './DashboardProfile';
import Spinner from '../shared/Spinner';
import LevelBadge from '../shared/LevelBadge';
import './dashboard.css';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCurrentProfile()
    this.props.getLessons()
  }


  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    const { lessons } = this.props
    let userProfile, completedLessons, userCompletedLessons

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
            <Link to="/profile/create" className="ui violet button" style={{ width: "100%", marginTop: "20px" }}>
              Create Profile
            </Link>
          </div>
        )

      }
    }

    if (profile && Object.keys(profile).length > 0 && lessons) {
      completedLessons = lessons.filter(lesson => {
        return lesson.completes.find(c => c.user === user.id)
      })

     if (completedLessons.length >= 1) {
       userCompletedLessons = (
         <div className="six wide column">
           <div className="dashboard-list" id="with-shadow">
             <h3 style={{ marginBottom: '10px '}}>Completed Lessons</h3>
             {completedLessons.splice(0, 5).map(lesson => {
                 return (
                     <div className="ui list">
                       <a className="item">
                         <i className="right triangle icon" />
                         <div className="content">
                           <div className="header" style={{ fontSize: '1.5rem', marginBottom: '10px' }}><Link to={`/lesson/${lesson._id}`}>{lesson.title}</Link>
                           </div>
                          </div>
                       </a>
                     </div>
                   )}
                )}
                <Link className="ui violet button" to="/mycompletes" style={{ width: '100%' }}>View all completed lessons</Link>

        </div>
      </div>
    )} else {
      userCompletedLessons = (
        <div className="six wide column">
          <div className="dashboard-list" id="with-shadow">
           <h3 style={{ textAlign: 'center' }}>You haven't completed any lessons yet!</h3>
             <Link className="ui violet button" style={{ width: '100%' }} to='/lessons'>Get Started</Link>
          </div>
        </div>
      )
    }
    }
    return (
        <div className="ui centered grid">

            {userProfile}
            {userCompletedLessons}
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
  profile: state.profile,
  lessons: state.lesson.lessons
})

export default connect(mapStateToProps, { getCurrentProfile, getLessons })(Dashboard)
