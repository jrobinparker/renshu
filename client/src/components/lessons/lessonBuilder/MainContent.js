import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class MainContent extends React.Component {

  saveAndContinue = e => {
    e.preventDefault()
    console.log(this.props.mainContent)
  }


  goBack = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const { mainContent } = this.props
    return (
      <div className="lesson-form with-shadow">
      <form className="ui form">
        <div className="field">
          <label>Lesson Content</label>
          <CKEditor
            editor={ ClassicEditor }
            config={{ rows: '40%' }}
            data={this.props.mainContent}
            onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    this.props.handleOnChangeDesc(data);
                                } }
                                />
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <button onClick={this.goBack} className="ui secondary button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
          <button onClick={this.saveAndContinue} className="ui violet button" style={{ width: '40%' }}>Next</button>
        </div>
      </form>
      </div>
    )
  }
}

export default MainContent
