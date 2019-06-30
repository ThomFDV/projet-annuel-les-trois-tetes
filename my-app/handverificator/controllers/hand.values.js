'use strict';

const ArrayOperations = require('./array.operations');
const Combinations = require('../models/combinations');
const Hcm = require('./hand.combination.mapping');

class HandValues {
  
  getPair(hand) {
    let index = hand.length - 1;
    let combinationValue = hand[index].value;
    for(let i = index - 1; i >= 0; i -= 1) {
      if(hand[i].value === combinationValue) return hand[i].value;
      combinationValue = hand[i].value;
    }
    return undefined;
  }

  getDoublePair(hand) {
    let highestPairValue = this.getPair(hand);
    let lowestPairValue = undefined;
    let tempHand = ArrayOperations.withoutValue(hand, highestPairValue);
    if(ArrayOperations.getSameValue(tempHand) > 1) lowestPairValue = this.getPair(tempHand);
    if(lowestPairValue !== undefined) {
      return Hcm.doublePairMapping(hand, highestPairValue, lowestPairValue);
    } 
    return Hcm.pairMapping(hand, highestPairValue);
  }

  getThreeOfAKind(hand) {
    let combinationValue = hand[6].value;
    let counter = 1;
    for(let i = 5; i >= 0; i -= 1) {
      if(hand[i].value === combinationValue) {
        if((counter += 1) == 3) return combinationValue;
      } else {
        combinationValue = hand[i].value;
        counter = 1;
      }
    }
  }

  getFullHouse(hand) {
    let TOAKValue = this.getThreeOfAKind(hand);
    let pairValue = undefined;
    let tempHand = ArrayOperations.withoutValue(hand, TOAKValue);
    if(ArrayOperations.getSameValue(tempHand) > 1) pairValue = this.getPair(tempHand);
    if(pairValue !== undefined) return Hcm.fullHouseMapping(TOAKValue, pairValue);
    return Hcm.threeOfAKindMapping(hand, TOAKValue); 
  }

  getFourOfAKind(hand) {
    let combinationValue = hand[6].value;
    let counter = 1;
    for(let i = 5; i >= 0; i -= 1) {
      if(hand[i].value === combinationValue) {
        if(++counter === 4) return Hcm.fourOfAKindMapping(hand, combinationValue);
      } else {
        if(i === 3) return Hcm.fourOfAKindMapping(hand, hand[i].value);
        counter = 1;
        combinationValue = hand[i].value;
      }
    }
  }

  getStraightFlush(hand, maxStraightValue) {
    let index = 6;
    while(hand[index].value != maxStraightValue) index -= 1;
    let colorToFind = hand[index].color;
    index -= 1;
    for(let i = 0; i < 4; i += 1) {
      if(hand[index - i].color !== colorToFind) return false;
    }
    return true;
  }

  getHighValue(hand) {
    return hand[6].value;
  }
}

module.exports = new HandValues();