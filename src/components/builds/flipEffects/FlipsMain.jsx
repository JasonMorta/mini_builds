import React, { Component } from 'react'
import Card from './Card'

export default class FlipsMain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       flipped: true
    }
  }


  flipCard(e){
    //alert("clicked")
    console.log(e.target.dataset)
  }
  render() {
    return (
      <div>
        <Card handleClick={this.flipCard.bind(this)}/>
      </div>
    )
  }
}

