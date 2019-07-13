'use strict';

const Card = require("./card");

class Deck {
  constructor() {
    this.decklist = [];
    const card = new Card;
    for (let value of card.value) {
      for (let color of card.color) {
        let aCard = [value, color];
        this.decklist.push(aCard);
      }
    }
  }

  shuffleDeck() {
    const {decklist} = this;
    let m = decklist.length;
    let i;

    while(m){
      i = Math.floor(Math.random() * m--);
      [decklist[m], decklist[i]] = [decklist[i], decklist[m]];
    }

    return this;
  }

  draw(){
    return this.decklist.pop();
  }
}

module.exports = Deck;
