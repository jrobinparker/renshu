import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getLessons } from '../../actions/lessonActions';
import { getCourses } from '../../actions/courseActions';
import DashboardProfile from './DashboardProfile';
import DashboardCompletedLessons from './DashboardCompletedLessons';
import DashboardCompletedCourses from './DashboardCompletedCourses';
import Spinner from '../shared/Spinner';
import LevelBadge from '../shared/LevelBadge';
import './dashboard.css';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getCurrentProfile()
    this.props.getLessons()
    this.props.getCourses()
  }


  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    const { lessons, courses } = this.props
    let userProfile, completedLessons, dashboardCompletedLessons, completedCourses, dashboardCompletedCourses

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
       dashboardCompletedLessons = <DashboardCompletedLessons lessons={completedLessons} />
     } else {
      dashboardCompletedLessons = (
        <div className="six wide column">
          <div className="dashboard-list" id="with-shadow">
           <h3 style={{ textAlign: 'center' }}>You haven't completed any lessons yet!</h3>
             <Link className="ui violet button" style={{ width: '100%' }} to='/lessons'>Get Started</Link>
          </div>
        </div>
      )
    }
    }

    if (profile && Object.keys(profile).length > 0 && courses) {
      completedCourses = courses.filter(course => {
        return course.completes.find(c => c.user === user.id)
      })

     if (completedCourses.length >= 1) {
       dashboardCompletedCourses = <DashboardCompletedCourses courses={completedCourses} />
     } else {
      dashboardCompletedCourses = (
        <div className="six wide column">
          <div className="dashboard-list" id="with-shadow">
           <h3 style={{ textAlign: 'center' }}>You haven't completed any courses yet!</h3>
             <Link className="ui violet button" style={{ width: '100%' }} to='/courses'>Get Started</Link>
          </div>
        </div>
      )
    }
    }

    return (
        <div className="ui centered grid">

            {userProfile}
            {dashboardCompletedLessons}
            {dashboardCompletedCourses}


        </div>


    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  lessons: state.lesson.lessons,
  courses: state.course.courses
})

export default connect(mapStateToProps, { getCurrentProfile, getLessons, getCourses })(Dashboard)
