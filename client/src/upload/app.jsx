import React from 'react'
import Dropzone from './app/dropzone'
import ProgressModal from './app/progress'
import EmailModal from './app/email'
import NextButton from './app/next'
import './app.css'

const states = {
  init: {
    ADD_FILE: 'adding'
  },
  adding: {
    ADD_FILE: 'adding',
    DONE_ADDING: 'email'
  },
  email: {
    GOT_EMAIL: 'upload'
  },
  upload: {
    DONE_UPLOAD: 'done'
  },
  done: {

  }
}

class UploadApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      app: 'init'
    }

  }

  command(nextState, action) {
    switch (nextState) {
    case 'adding':
      return { files: action.files }
      break
    case 'email':
      return { files: action.files }
      break
    case 'upload':
      return { email: action.email }
      break
    case 'done':
      return { result: action.result }
      break       
    default:
      break
    }
  }
  
  transition(action) {
    const currentState = this.state.app
    const nextAppState =
      states[currentState][action.type]
    
    if (nextAppState) {
      const nextState = this.command(nextAppState, action)
      
      this.setState({
        ...this.state,
        ...nextState,
        app: nextAppState
      })
    }
  }
  
  render(){
    const appState = this.state.app
    return <div className="upload-app-container" data-state={appState}>
      <Dropzone 
        onAdd={(files)=>this.transition({type: 'ADD_FILE', files})} 
        state={appState}/>
      <NextButton 
        onClick={()=>this.transition({type: 'DONE_ADDING'})} 
        state={appState}/>
      {(appState == 'email') ? <EmailModal 
        onEmail={(email)=>this.transition({type: 'GOT_EMAIL', email})} 
        state={appState}/> : null}
      {(appState == 'upload') ? <ProgressModal 
        email={this.state.email}
        files={this.state.files}
        onComplete={(result)=>this.transition({type: 'DONE_UPLOAD', result})} 
        state={appState}/> : null}
    </div>
  }

}

export default UploadApp