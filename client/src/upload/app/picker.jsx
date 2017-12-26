import React from 'react'

const UploadPicker = (props)=>{
  return <span 
    className="upload-picker" 
    data-state={props.state}>
    <label>
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={(evt) => props.onAdd(evt.target.files)}/>
      Browse photos
    </label>
  </span>
}

export default UploadPicker