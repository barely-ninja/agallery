import React from 'react'
import ReactDOM from 'react-dom'
import SelectionApp from './app'
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(SelectionApp),
    document.getElementById('mount')
  )
})