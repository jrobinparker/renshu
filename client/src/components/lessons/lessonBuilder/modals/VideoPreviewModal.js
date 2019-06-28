import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';

class VideoPreviewModal extends React.Component {
  render() {
  return ReactDOM.createPortal(
    <div onClick={this.props.closeModal} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
         <div style={{ width: '100%', padding: '5px 0 5px 0', backgroundColor: 'black' }}>
          <ReactPlayer url={this.props.video} style={{ margin: '0 auto' }}/>
        </div>
        </div>
      </div>
    ,
    document.querySelector('#video-modal')
    )
  }
}

export default VideoPreviewModal;
