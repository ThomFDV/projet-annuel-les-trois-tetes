'use strict';

const ArrayOperations = require('./array.operations');
const Hcm = require('./hand.combination.mapping');

class HandValues {
  
  getPair(hand) {
    let index = hand.length - 1;
    let combinationValue = hand[index][0];
    for(let i = index - 1; i >= 0; i -= 1) {
      if(hand[i][0] === combinationValue) return hand[i][0];
      combinationValue = hand[i][0];
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
    let combinationValue = hand[6][0];
    let counter = 1;
    for(let i = 5; i >= 0; i -= 1) {
      if(hand[i][0] === combinationValue) {
        if((counter += 1) === 3) return combinationValue;
      } else {
        combinationValue = hand[i][0];
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
    let combinationValue = hand[6][0];
    let counter = 1;
    for(let i = 5; i >= 0; i -= 1) {
      if(hand[i][0] === combinationValue) {
        if(++counter === 4) return Hcm.fourOfAKindMapping(hand, combinationValue);
      } else {
        if(i === 3) return Hcm.fourOfAKindMapping(hand, hand[i][0]);
        counter = 1;
        combinationValue = hand[i][0];
      }
    }
  }

  getStraightFlush(hand, maxStraightValue) {
    let index = 6;
    while(hand[index][0] !== maxStraightValue) index -= 1;
    let colorToFind = hand[index][1];
    index -= 1;
    for(let i = 0; i < 4; i += 1) {
      if(hand[index - i][1] !== colorToFind) return false;
    }
    return true;
  }
}

module.exports = new HandValues();
