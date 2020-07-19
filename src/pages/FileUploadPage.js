import React, { Component } from 'react';
import HeadCategory from '../components/layout/HeadCategory';
import FileUpload from '../components/Upload/FileUpload';




class FileUploadPage extends Component {
  render() {
    return (
      <div>
        <HeadCategory/>
        <FileUpload/>
      </div>
    )
  }
}

export default FileUploadPage;
