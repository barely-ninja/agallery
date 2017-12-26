import React from 'react'

const EmailModal = (props) => {
  return (
    <div 
      className="modal-email-prompt"
      data-state={props.state}>
      <span>Please enter your email to receive a link to processed photos:</span>
      <form onSubmit={(evt) => props.onEmail(evt.target.elements['email'].value)}>
        <label>
          <input 
            type="email"/>
          Email
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default EmailModal