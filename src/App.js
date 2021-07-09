import './App.css';
import React, { Component } from "react";
import { render } from "react-dom";

const currentUser = "ziggy1" 
let currentUserFound = false

class App extends Component{
  constructor(){
    super()
    this.state = {
      subjects: [],
      newSubj: "", 
      currentSubj: "None",
      flashCards: {},
      newCard: ["", ""]
    }

    this.subjClick = this.subjClick.bind(this);
    this.updateNewCard = this.updateNewCard.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  componentDidMount() {
    fetch(`/api?user=${currentUser}`)
      .then(res => res.json())
      .then((state) => {
      let stateData = state
      // if (!Array.isArray(characters)) characters = [];
  
      // return this.setState({
      //   characters,
      //   fetchedChars: true
      // });
      const { flashCards, subjects, currentSubj } = stateData.state
      console.log(JSON.stringify(stateData.state))
      console.log("cards: " + JSON.stringify(flashCards))
      console.log("sub" + subjects)
      if(flashCards && subjects){
        currentUserFound = true
        this.setState({
          flashCards: flashCards,
          subjects: subjects,
          currentSubj: currentSubj
        })
      }
    })
    .catch(err => console.log('Characters.componentDidMount: get characters: ERROR: ', err));
  }


  updateNewSubj(newVal){
    this.setState({
      newSubj: newVal
    });
    // fetch('/api', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/JSON'
    //   },
    //   body: JSON.stringify({user: currentUser, state: this.state})
    // })
  }

  addSubj(e) {
    e.preventDefault();
    let subjs = this.state.subjects
    subjs.push(this.state.newSubj)
    this.setState({
      subjects: subjs,
      newSubj: ""
    })
  }

  updateNewCard(e, idx){
    let card = this.state.newCard;
    card[idx] = e
    this.setState({
      newCard: card
    })
    console.log(this.state.newCard)
  }

  addNewCard(e){
    e.preventDefault()
    console.log("addNewCard")
    if (this.state.currentSubj === "None") return;
    let flashCards = this.state.flashCards
    //let currentCards = flashCards[this.state.currentSubj]
    if (!flashCards[this.state.currentSubj]) {
      flashCards[this.state.currentSubj] = [this.state.newCard]
    }
    else {
      flashCards[this.state.currentSubj].push(this.state.newCard)
    }
    console.log("addNewCard")
    this.setState({
      flashCards: flashCards,
      newCard: ["", ""]
    })
    console.log("CARDS: " + JSON.stringify(this.state.flashCards))
    console.log(this.state.newCard)
    console.log("post from addnewcard")
    if (! currentUserFound){
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({user: currentUser, state: this.state})
      })
    }
    else{
      fetch(`/api?user=${currentUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({user: currentUser, state: this.state})
      })
    }
  }

  subjClick(newVal){
    this.setState({
      currentSubj: newVal
    })
  }

  render() {
    const buttons = []
    for (let sub in this.state.subjects){
      buttons.push(<Subject subjClick={this.subjClick} subject={this.state.subjects[sub]} key={sub}/>)
    }
    let CC
    if (this.state.flashCards[this.state.currentSubj]){
      CC = this.state.flashCards[this.state.currentSubj]
    }
    else CC = []
    return (
      <div className="main">
        <h1>STUDY FLASH CARDS</h1>
        <form>
          <input type="text" value={this.state.newSubj} onChange={(e)=>this.updateNewSubj(e.target.value)}/>
          <button onClick={(e)=>this.addSubj(e)}>Add Subject</button>
        </form>
        <div className="subjectsDiv">
          {buttons}
        </div>
        <div className="currentSubject">
          Showing Cards for Subject: {this.state.currentSubj}
        </div>
        <FlashCards newCards={this.state.newCard} newCardUpdate={this.updateNewCard} addNewCard={this.addNewCard} currentCards={CC}/>
      </div>
)}
}

class Subject extends Component{
  render() {
    return (
      <div className="subjects">
        <input className="option" value={this.props.subject} type="radio" name="subjGroup" onChange={(e)=>this.props.subjClick(e.target.value)}>
        </input>
        <label>
          {this.props.subject}
        </label>
      </div>
    )
  }
}

class FlashCards extends Component{
  render(){
    let cards = []
    if (this.props.currentCards.length){
      for (let card of this.props.currentCards){
        cards.push(<Card value={card}/>)
      }
    }
    return (
      <div className="flashCards">
      <form>
        <label>Question</label>
        <input type="text" value={this.props.newCards[0]} onChange={(e, idx)=>this.props.newCardUpdate(e.target.value, 0)}/>
        <label>Answer</label>
        <input type="text" value={this.props.newCards[1]} onChange={(e, idx)=>this.props.newCardUpdate(e.target.value, 1)}/>
        <button onClick={(e)=>this.props.addNewCard(e)}>Create New Flash Card</button>
      </form>
      <div className="cardsHolder">
        {cards}
      </div>
      </div>
    )
  }

}

class Card extends Component {
  render(){
    return(
  <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <h2>{this.props.value[0]}</h2>
      </div>
      <div className="flip-card-back">
        <h2>{this.props.value[1]}</h2>
      </div>
    </div>
  </div>
      
    )
  }
}

export default App;