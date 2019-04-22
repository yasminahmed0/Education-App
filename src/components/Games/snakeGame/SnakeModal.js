import React, {Component} from 'react'

class SnakeModal extends Component{
  constructor(props){
    super(props)
  }
    render(){
      if(this.props.choices !== undefined){
      let options = [
        <option key='-1' hidden default disabled>Choose here</option>
        // <option key='-2' default disabled className="text-hideModal">Choose here</option>
      ]
      for(let i=0;i<this.props.choices.length;i++){
        options.push(<option key={i} value={i}>{this.props.choices[i]}</option> )
      }
      console.log(options.length)
      console.log(options)
      return(
        <div style={{display: this.props.isSnakeModalOpen ? 'block' : 'none'}}>
        <div className='snakeModal'>
        <p>Choose the correct spelling from the list!</p>
        <select className='browser-default' onChange={this.props.handleChange}>
         {/* <option hidden>Choose here</option> */}
       <option  default className="text-hideModal">Choose here</option> 
        {options}
        </select>
        <button className='snakeModalButton' style={{display: this.props.canSubmit ? 'block' : 'none'}} onClick={this.props.closeSnakeModal}>Submit Answer</button>
        </div>
        </div>
      )
    }
    else{
      return(
        <div>
        </div>
      )
    }
  }
}
export default SnakeModal
