import React, { Component } from "react";
import friends from "../../friends.json";
import Card from "../Card";
import "./Game.css"

class Game extends Component {

  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  getFriend = (id) => {

    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }

  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "Oh sweet you guys look at me!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Screw you guys I'm goin home!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <div className="container">
        <div class="jumbotron jumbotron-fluid" style={{ padding: 0 }}>
          <div class="container">
            <h1 class="display-4">Meet Some Friends of Mine</h1>
            <p class="lead">Try to click on each character, but if you click the same one twice
            you're gonna have a bad time.</p>
            <p>Current Score: {this.state.currentScore}</p>
            <p>Top Score: {this.state.topScore}</p>
            <h3>{this.state.rightWrong}</h3>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {this.state.friends.map(friend => (

            <Card
              name={friend.name}
              key={friend.id}
              getFriend={this.getFriend}
              handleIncrement={this.handleIncrement}
              handleReset={this.handleReset}
              handleShuffle={this.handleShuffle}
              id={friend.id}
              image={friend.image}
            />

          ))}
        </div>
      </div>
    )
  }
}

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default Game;
