import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './home.css';

class Home extends React.Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }


  render() {

  return (
    <div>
      <div id="home-background-1">

      <div className="home-welcome">
      <h1 className="home-welcome-text">renshu</h1>

          <h3 className="header" style={{ marginBottom: '30px' }}>a community-driven japanese learning platform</h3>
        <Link to="/login" className="home-login ui button violet">
          login
        </Link>
        <Link to="/register" className="home-register ui button violet">
          register
        </Link>
      </div>

      <div className="home-down-arrow-1">
        <i className="chevron down icon" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => document.getElementById('home-background-2').scrollIntoView({behavior: 'smooth'})}
      />
      </div>
      <div className="arrow-text-1">
        features
      </div>
      </div>
      <div id="home-background-2">
        <div className="home-features">
          <h1><span role="img" alt="community icon">&#x1F481;</span> learn japanese with lessons developed by the community</h1>
          <h1><span role="img" alt="pc icon">&#x1F4BB;</span> create your own lessons with an easy-to-use editor</h1>
          <h1><span role="img" alt="card icon">&#x1F3F7;</span> build flash card decks</h1>
          <h1><span role="img" alt="video icon">&#x1F4FA;</span> add videos from youtube, vimeo, and more</h1>
          <h1><span role="img" alt="books icon">&#x1F4DA;</span> combine lessons into a full course</h1>
        </div>
      </div>
      <div className="home-down-arrow-2">
        <i class="chevron down icon" style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => document.getElementById('home-background-3').scrollIntoView({behavior: 'smooth'})}
      />
      </div>
      <div className="arrow-text-2">
        about
      </div>
      <div id="home-background-3">
        <div className="home-about">
          <h1>
            this site was developed by jeremy parker
          </h1>
          <br />
          <div style={{ fontSize: '3rem' }}>
            <a href="https://github.com/jrobinparker" style={{ color: 'blue' }} target="_blank" rel="noopener noreferrer"><i class="github icon" /></a>
            <a href="https://www.linkedin.com/in/jrobinparker/" style={{ color: 'black' }} target="_blank" rel="noopener noreferrer"><i class="linkedin icon" /></a>
          </div>
          <h2>using...</h2>
          <div className="home-about-developed">
            <div>
              <img src="https://seeklogo.com/images/M/mongodb-logo-4A71340576-seeklogo.com.png" style={{ width: '50%' }} alt="mongodb logo"/>
              <div className="home-about-developed-text" style={{ marginTop: '15%' }}>mongoDB atlas</div>
            </div>
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" style={{ width: '20%' }} alt="react logo"/>
              <div className="home-about-developed-text" style={{ marginTop: '3%'}}>react</div>

            </div>
            <div>
              <img src="https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png" style={{ width: '20%' }} alt="redux logo" />
              <div className="home-about-developed-text">redux</div>
            </div>
            <div>
              <img src="https://seeklogo.com/images/N/nodejs-logo-54107C5EDD-seeklogo.com.png" style={{ width: '20%' }} alt="nodejs logo" />
              <div className="home-about-developed-text">nodeJS</div>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)
