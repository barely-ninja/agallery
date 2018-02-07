import React from 'react'
import Pane from 'common/pane'

class SelectorPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: props.images.filter(this.filterSimilarBy('time'))
    }
  }

  filterSimilarBy(criteria) {
    /*use this.props.target*/
    switch (criteria){
    case 'time':
      return image => true
    case 'quality':
      return image => true
    default:
      return image => true
    }
  }

  resetActive(src) {
    this.setState({images: this.state.images.map(
      item => ({...item, isActive: (item.src === src)?!item.isActive:false})
    )})
  }

  render() {
    const currentSelection = this.state.images.filter(item => item.isActive) 
    return (
      <div
        className="selector-pane-container">
        <form 
          onChange={(ev) => this.setState({
            images: this.props.images.filter(this.filterSimilarBy(ev.target.value))
          })}>
          <div className="similarity-toggle">
            <input 
              type="radio"
              id="time"
              name="similarity" 
              value="time"
              defaultChecked/>
            <label htmlFor="time">
              Similar time
            </label>
            <input 
              type="radio" 
              id="quality"
              name="similarity" 
              value="quality"/>
            <label htmlFor="quality">
              Similar quality
            </label>
          </div>
        </form>
        <Pane
          class="similar-images-pane"
          imageClass={this.props.imageClass}
          onSelect={({src}) => this.resetActive(src)}
          images={this.state.images}/>
        <div className="replace-button-container">
          <div
            className="replace-button"
            onClick={() => (currentSelection.length>0) ? 
              this.props.onReplace(currentSelection[0].src) : 
              null}>
            Replace
          </div>
        </div>
      </div>
    )}
}

export default SelectorPane