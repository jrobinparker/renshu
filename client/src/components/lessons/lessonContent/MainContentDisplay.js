import React from 'react';
import Interweave from 'interweave';
import './lesson-content.css'

class MainContentDisplay extends React.Component {

  componentDidMount() {
    let content = document.getElementById("content")

    function setScrollIndicator() {
      const scroll = content.scrollTop
      const scrollHeight = content.scrollHeight
      let scrollPercent = (scroll / scrollHeight * 100)
      let scrollBar = document.getElementById("myBar")
      document.getElementById("myBar").style.width = scrollPercent + "%";
      if (content.offsetHeight + content.scrollTop >= content.scrollHeight) {
        document.getElementById("myBar").style.width = "100%";
      }
    }

    content.onscroll = () => {
      setScrollIndicator()
    }
  }

  render() {



  return (
      <div style={{ padding: '0px 20px 20px 20px' }}>
        <Interweave content={this.props.content} />
      </div>
    )
  }
}

export default MainContentDisplay;
