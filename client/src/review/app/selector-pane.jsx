import React from 'react'
import Pane from 'common/pane'

const filterSimilar = (target, criteria) => {
  switch (criteria){
  case 'time':
    return image => true
  case 'quality':
    return image => true
  default:
    return image => true
  }
}

class SelectorPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      similar: 'time'
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.target) {
      this.setState({
        images: nextProps.images.filter(filterSimilar(nextProps.target, this.state.similar))
      })
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
        <div className="replace-button-container">
          <div
            className="replace-button"
            onClick={() => {
              if (currentSelection.length>0){
                this.setState({images: []})
                this.props.onReplace({src: currentSelection[0].src})
              }
            }}>
            Replace
          </div>
        </div>
        <Pane
          class="similar-images-pane"
          imageClass={this.props.imageClass}
          onSelect={({src}) => this.resetActive(src)}
          images={this.state.images}/>
        <div className="similarity-toggle">
          <form 
            onChange={(ev) => this.setState({
              images: this.props.images.filter(filterSimilar(this.props.target, ev.target.value)),
              similar: ev.target.value
            })}>
            <input 
              type="radio"
              id="time"
              name="similarity" 
              value="time"
              checked={this.state.similar == 'time'}/>
            <label htmlFor="time">
              Similar time
            </label>
            <hr/>
            <input 
              type="radio" 
              id="quality"
              name="similarity" 
              value="quality"
              checked={this.state.similar == 'quality'}/>
            <label htmlFor="quality">
              Similar quality
            </label>
          </form>
        </div>
      </div>
    )}
}

export default SelectorPane