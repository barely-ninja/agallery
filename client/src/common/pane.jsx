import React from 'react'
import Thumbnail from './thumb.jsx'

const Pane = (props) => {
  return <div 
    className={props.class}>
    {props.images.map((image, id)=>{
      return <Thumbnail 
        src={image.src}
        key={id}
        selected={image.isSelected}
        class={props.imageClass(image)}
        name={image.src.split('/').pop()}
        onClick={props.onSelect}
      />}
    )}
  </div>
}

export default Pane