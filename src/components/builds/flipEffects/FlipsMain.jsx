import React, { Component } from 'react'
import Card from './Card'

export default class FlipsMain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cardData: "",
      gameOver: false
    }
  }

//On page load, cardData will be "", but on click it will be given a number/the selected cards id.
//this will be used to add the flip CSS
  flipCard(e){
   this.setState({
    cardData: Number(e.target.dataset.cardData),
    gameOver: true
   })
   console.log("card ID", Number(e.target.dataset.cardData))
  }

  restart(){
    this.setState({
      cardData: "",
      gameOver: false
     })
  }

  render() {
    return (
      <div>
        <Card 
          gameOver={this.state.gameOver}
          cardData={this.state.cardData}
          handleClick={this.flipCard.bind(this)}
          />

          
          {this.state.gameOver ? <div className="btn-cont">
             <button 
             onClick={this.restart.bind(this)}
              className="night">Restart</button>
          </div>
          :
          <></>}
      </div>
    )
  }
}

