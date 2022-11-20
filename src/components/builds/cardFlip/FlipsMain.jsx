import React, { Component } from 'react'
import Partic from '../Partic'
import Card from './Card'

export default class FlipsMain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cardData: "",
      gameOver: false,
      didWin: false
    }
  }

//On page load, cardData will be "", but on click it will be given a number/the selected cards id.
//this will be used to add the flip CSS
  flipCard(e) {
    if (!this.state.gameOver) {
        this.setState({
        cardData: Number(e.target.dataset.cardData),
        gameOver: true,
        didWin: e.target.dataset.getTruth,
      })
    }
  }

  restart(){
    this.setState({
      cardData: "",
      gameOver: false,
      didWin: false
     })
  }

  render() {
    return (
      <div>
        { this.state.didWin === "true" ? <Partic /> :  <></>}
        <Card 
          gameOver={this.state.gameOver}
          cardData={this.state.cardData}
          handleClick={this.flipCard.bind(this)}
          />
          {this.state.gameOver ? <div className="btn-cont">
             <button 
             onClick={this.restart.bind(this)}
              className={`${this.state.gameOver ? "night shake-horizontal": " night"}`}>Restart</button>
          </div>
          :
          <></>}
      </div>
    )
  }
}

