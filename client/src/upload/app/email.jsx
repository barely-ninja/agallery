import React from 'react'

const EmailModal = (props) => {
  return (
    <div 
      className="modal-email-prompt"
      data-state={props.state}>
      <div>Please enter your email to receive a link to processed photos:</div>
      <form onSubmit={(evt) => props.onEmail(evt.target.elements['email'].value)}>
        <label>
        Email: 
          <input 
            type="email"/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default EmailModal