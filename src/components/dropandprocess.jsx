import React, { Component } from 'react';
import axios from 'axios';
import ResumeDetails from './resumedetails'
import Dropzone from 'react-dropzone'
import './dropandprocess.css'

class DropAndProcess extends Component {
    state = {
        file: null,
        resumedetails: null,
        
    }
    onDrop = (acceptedFiles) => {
        //console.log(acceptedFiles[0]);
        let state = this.state
        state.file = acceptedFiles[0]
        /* state.showpreview = true
        state.showdropper = false  */
        this.setState(state)
        
      }
    
      submit = () => {
        if (!this.state.file)
            return
        const data = new FormData() 
        data.append('file', this.state.file)
        alert('Your file is being processed please wait. And press ok to continue.')
        axios.post("http://localhost:5000/fileupload", data, { // receive two parameter endpoint url ,form data 
          })
          .then(res => { // then print response status
            //console.log(res)
            if (!res.data.success)
              alert('internal error')
            else 
              this.setState({resumedetails: res.data.message})
          }).catch(err => {
            alert(err.response.data.message)
          })
      }
    
      valueChange = (id, value) => {
        if (!this.state.resumedetails)
          return
        let resumedetails = this.state.resumedetails
        resumedetails[id] = value
        //console.log(resumedetails)
        this.setState({resumedetails: resumedetails})
        
      }
      
    render() { 
        return ( 
            <div className="fileuploadparentdr">

      <div className="dropzoneparent" >
        <h1 style={{marginLeft: 20}}>Drop Files below</h1>
        <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => (
            <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
                <div className="dragmessage">{isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}</div>
                
            </div>
            )}
        </Dropzone>
        

        <div className="submitbuttondiv">
          <button className="btn btn-primary badge-primary"
            style={{marginTop:10}}
            onClick={this.submit}
            >Submit
          </button>
        </div>
      </div>

      <div className="showrequestparent">
          <h1 style={{marginLeft: 50}}>Resume Details</h1>
          <ResumeDetails resumedetails={this.state.resumedetails} onValueChange={this.valueChange}/>
          

      </div>
        </div>
         );
    }
}
 
export default DropAndProcess;