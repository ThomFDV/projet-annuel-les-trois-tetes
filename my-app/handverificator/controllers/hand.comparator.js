'use strict';

const Ao = require('./array.operations');
const Hcm = require('./hand.combination.mapping');
const HandValues = require('./hand.values');
const Combinations = require('../models/combinations');
const Color = require('../models/color');
const CombinationsComparator = require('./combinations.comparator');

class HandComparator {

  constructor(allHands, board) {
    this.hands = [];
    for(let hand of allHands) {
      this.hands.push(Ao.sortByAsc(hand.concat(board)));
    }
    for(let hand of this.hands) {
      console.log(hand);
    }
    this.combinations = [];
  }

  compareHands() {
    for(let hand of this.hands) {
      this.combinations.push(this.getBestCombination(hand));
    }
    this.combinations = Hcm.sortByCombinations(this.combinations);
    for(let combination of this.combinations) {
      console.log(combination);
    }
  }

  getBestCombination(pokerHand) {
    let sameValue = Ao.getSameValue(pokerHand);
    let sameColor = Ao.getColor(pokerHand);
    let followingValues = Ao.getFollowingCards(pokerHand);

    let result;

    if(followingValues != 0) {
      result = Hcm.straightMapping(followingValues);
      if(sameColor !== Color.EMPTY) {
        if(HandValues.getStraightFlush(pokerHand, followingValues)) {
          result = Hcm.straightFlushMapping(followingValues);
        }
      }
    } else if(sameColor !== Color.EMPTY) {
      result = flushMapping(pokerHand, sameColor);
    } else {
      switch(sameValue) {
        case 4:
          result = HandValues.getFourOfAKind(pokerHand);
          break;
        case 3:
          result = HandValues.getFullHouse(pokerHand);
          break;
        case 2:
          result = HandValues.getDoublePair(pokerHand);
          break;
        case 1:
          result = Hcm.highValueMapping(pokerHand);
          break;
      }
    }
    return result;
  }
}

module.exports = HandComparator;