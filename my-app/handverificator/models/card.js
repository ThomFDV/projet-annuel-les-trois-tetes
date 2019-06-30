'use strict';

class Card {
  constructor(color, value) {
    this.color = color;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

module.exports = Card;