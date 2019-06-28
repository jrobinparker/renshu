import React from 'react';
import ReactDOM from 'react-dom';
import Interweave from 'interweave';

class MainContentPreviewModal extends React.Component {
  render() {
  return ReactDOM.createPortal(
    <div onClick={this.props.closeModal} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active" style={{ height: '70%', overflowY: 'scroll', marginTop: '-5px' }}>
        <div style={{ padding: '20px' }}>
          <Interweave content={this.props.content} />
        </div>
      </div>
    </div>
    ,
    document.querySelector('#main-content-preview')
    )
  }
}

export default MainContentPreviewModal;
