import React from 'react'
import Pane from 'common/pane'
import SelectorPane from './app/selector-pane'
import './app.css'

const states = {
  selection: {
    TOGGLE_ACTIVE: 'selection',
    ADD_ACTIVE: 'selection',
    DROP_ACTIVE: 'selection',
    REPLACE_ACTIVE: 'selection',
    CONTINUE: 'completed'
  },
  done: {
  }
}

const API = `/images?job_id=${window.location.pathname.split('/')[1]}`

class SelectionApp extends React.Component {
  constructor(props){ 
    super(props)
    this.state = {
      app: 'selection',
      images: []
    }

  }

  componentDidMount() {
    /*fetch(API)
      .then(response => response.json())
      .then(data => {
        const images = data.map((item) => {
          return {
            ...item,
            isActive: false,
            isSelected: false
          }
        })
        this.setState({ images })
      })
    */
    const test=[1112, 3334, 6678]
    this.setState({
      images: test.map(num => ({
        src: `https://dummyimage.com/150x150/000/fdd.png&text=${num}`,
        isActive: false,
        isSelected: false 
      }))
    })
  }

  command(nextState, action) {
    const addActive = (list) => {
      return list.map(item => ({
        ...item,
        isSelected: item.isSelected ? true : item.isActive,
        isActive: item.isSelected ? item.isActive : false
      }))
    }
    
    const dropActive = (list) => {
      return list.map(item => ({
        ...item,
        isSelected: (item.isSelected && item.isActive) ? false : item.isSelected,
        isActive: item.isSelected ? false: item.isActive
      }))
    }

    const toggleActive = (list, src) => {
      return list.map(item => (item.src === src) ? 
        {...item, isActive:!item.isActive} : 
        item)
    }

    const replaceActive = (oldSrc, newSrc, list) => {
      return list.map(item => {
        if (item.src == oldSrc) 
          return {...item, isActive: false, isSelected: false} 
        if (item.src == newSrc) 
          return {...item, isActive: false, isSelected: true}
        else return item
      })
    }

    switch (nextState) {
    case 'selection':
      switch (action.type){
      case 'TOGGLE_ACTIVE' :
        return {images: toggleActive(this.state.images, action.src)}
      case 'ADD_ACTIVE' :
        return {images: addActive(this.state.images)}
      case 'DROP_ACTIVE' :
        return {images: dropActive(this.state.images)}
      case 'REPLACE_ACTIVE' :
        return {images: replaceActive(action.target, action.src, this.state.images)}
      }
      break
    case 'completed':
      return {} 
    default:
      break
    }
  }
  
  transition(action){
    const currentState = this.state.app
    const nextAppState =
      states[currentState][action.type]
    
    if (nextAppState) {
      const nextState = this.command(nextAppState, action)
      //console.log(action)
      //console.log(nextState)
      this.setState({
        ...nextState,
        app: nextAppState
      })
    }
  }
  
  render(){
    const imageClass = {
      normal: 'image-gallery',
      active: 'image-gallery-active',
      selected: 'image-gallery-selected'
    }

    const selectImageClass = {
      all: image => {
        if (image.isActive && !image.isSelected) return imageClass.active
        if (image.isSelected) return imageClass.selected
        return imageClass.normal
      },
      best: image => {
        if (image.isActive && image.isSelected) return imageClass.active
        return imageClass.normal
      },
      similar: image => image.isActive ? imageClass.active : imageClass.normal
    }

    const appState = this.state.app
    const targetSelection = this.state.images.filter((item) => item.isActive && item.isSelected)
    const target = targetSelection.length > 0 ? targetSelection[0].src : null
    return <div className="selection-app-container">
      <div className="pane-container">
        <Pane class="all-images-pane"
          imageClass={selectImageClass.all} 
          onSelect={({src, isSelected}) => isSelected ? null : this.transition({type: 'TOGGLE_ACTIVE', src})}
          images={this.state.images}
          state={appState}/>
        <div className="pane-button-separator">
          <div
            className="add-button"
            onClick={() => this.transition({type: 'ADD_ACTIVE'})}>
            &gt;
          </div>
          <div
            className="remove-button"
            onClick={() => this.transition({type: 'DROP_ACTIVE'})}>
            &lt;
          </div>
        </div>
        <Pane class="best-images-pane"
          imageClass={selectImageClass.best} 
          onSelect={({src}) => this.transition({type: 'TOGGLE_ACTIVE', src})}
          images={this.state.images.filter(item => item.isSelected)} 
          state={appState}/>
      </div>
      <SelectorPane 
        images={this.state.images.map(item => ({...item, isActive: false}))}
        imageClass={selectImageClass.similar}
        target={target}
        onReplace={({src}) => this.transition({type: 'REPLACE_ACTIVE', target, src})}
        onDone={() => this.transition({type: 'CONTINUE'})} 
        state={appState}/>
    </div>
  }

}

export default SelectionApp