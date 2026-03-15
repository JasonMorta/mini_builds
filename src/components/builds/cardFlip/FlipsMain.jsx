import React, { Component } from 'react'
import Partic from '../Partic'
import Card from './Card'
import styles from './FlipsMain.module.css'

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
      <div className={styles.root}>
        <section className={styles.info}>
          <p style={{ margin: 0, color: "rgba(245, 239, 232, 0.78)" }}>Pick a card, reveal the outcome, then restart for another round.</p>
        </section>
        { this.state.didWin === "true" ? <Partic /> :  <></>}
        <Card 
          gameOver={this.state.gameOver}
          cardData={this.state.cardData}
          handleClick={this.flipCard.bind(this)}
          />
          {this.state.gameOver ? <div className={styles.actions}>
             <button 
             onClick={this.restart.bind(this)}
              className={styles.restartButton}>Restart</button>
          </div>
          :
          <></>}
      </div>
    )
  }
}

