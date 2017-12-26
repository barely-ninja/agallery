import React from 'react'

const NextButton = (props) => {
  return (
    <div className="next-button" 
      data-state={props.state}
      onClick={props.onClick}>
      Next
    </div>
  )
}

export default NextButton