import React from 'react'

const Thumbnail = (props) => {
  return <div 
    className={props.class}
    id={props.name}>
    <img
      onClick={(ev) => props.onClick({src: ev.target.src, isSelected: ev.target.isSelected})} 
      src={props.src}
    />
  </div>
}

export default Thumbnail