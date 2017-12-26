import React from 'react'
import ReactDOM from 'react-dom'
import UploadApp from './app'
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(UploadApp),
    document.getElementById('mount')
  )
})