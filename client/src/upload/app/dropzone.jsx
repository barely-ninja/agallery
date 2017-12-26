import React from 'react'
import Picker from './picker'

const Dropzone =(props)=> {
  const plug = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  
  const drop = (e) => {
    plug(e)
    const files = e.dataTransfer.files
    props.onAdd(files)
  }

  return <div 
    className="drop-area"
    data-state={props.state} 
    onDrop={drop}
    onDragEnter={plug} 
    onDragOver={plug}>
    <div>
      <span>Add photos by dragging them here</span>
      <span>or <Picker onAdd={props.onAdd}/></span>
    </div>
  </div>
}

export default Dropzone