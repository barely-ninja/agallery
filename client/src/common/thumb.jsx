import React from 'react'

const Thumbnail = (props) => {
  return <div 
    className={props.class}
    id={props.name}>
    <img
      className="thumb"
      onClick={(ev) => props.onClick({src: ev.target.src, isSelected: props.selected})} 
      src={props.src}
    />
  </div>
}

export default Thumbnail