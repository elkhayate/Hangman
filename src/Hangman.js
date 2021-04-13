import React, { Component } from "react";
import {randomWord} from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }
  restart () {
    this.setState({
      answer: randomWord(),
      guessed: new Set(),
      nWrong: 0
    })
  }

  render() {
    return (
      <div className='Hangman'>
      
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
        <h2>Number wrong : {this.state.nWrong}</h2>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        
        {this.state.nWrong < this.props.maxWrong ? <p className='Hangman-btns'>{this.generateButtons()}</p> : <p>You lose, correct answer is <span style={{color:"red"}}>{this.state.answer}</span></p>}
        <button id="restart" onClick={this.restart}>Restart</button>
        {this.state.answer === this.guessedWord().join("") && <p style={{color:"green"}}>You won !</p>}
      </div>
    );
  }
}

export default Hangman;
