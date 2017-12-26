import React from 'react'

class ProgressModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      progress: 0
    }
  }

  componentDidMount(){
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('email', this.props.email)
    this.props.files.forEach((file)=>{
      formData.append('images[]', file, file.name)
    })

    const self = this

    xhr.upload.addEventListener('progress', (evt)=>{
      if (evt.lengthComputable) {
        self.setState({progress: 100 * evt.loaded / evt.total})
      }
    }, false)

    xhr.onload = xhr.onerror = ()=> {
      const result = (this.status == 200) ? 'success' : 'error ' + this.status
      self.props.onComplete(result)
    }

    xhr.open('post', '/images', true)
    xhr.send(formData)
  }

  render(){
    return (
      <div className="modal-upload-progress">
        <span>{`Upload is ${this.state.progress.toFixed(1)}% complete`}</span>
      </div>
    )
  }

}

export default ProgressModal