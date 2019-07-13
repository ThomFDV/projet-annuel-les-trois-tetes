'use strict';

const Ao = require('./array.operations');
const Hcm = require('./hand.combination.mapping');
const HandValues = require('./hand.values');
const Combinations = require('../models/combinations');
const CombinationsComparator = require('./combinations.comparator');

class HandComparator {

  constructor(allHands, board) {
    this.hands = [];
    for(let hand of allHands) {
      this.hands.push(Ao.sortByAsc(hand.concat(board)));
    }
    this.combinations = [];
  }

  compareHands(players) {
    for(let hand of this.hands) {
      this.combinations.push(this.getBestCombination(hand));
    }
    let results = Hcm.sortByCombinations(this.combinations, players);
    for(let r of results) {
      console.log(r.player.email);
      console.log(r.combination);
    }
    return this.checkIfWinnersAreEven(results);
  }

  getBestCombination(pokerHand) {
    let sameValue = Ao.getSameValue(pokerHand);
    let sameColor = Ao.getColor(pokerHand);
    let followingValues = Ao.getFollowingCards(pokerHand);

    let result;

    if(followingValues !== 0) {
      result = Hcm.straightMapping(followingValues);
      if(sameColor !== null) {
        if(HandValues.getStraightFlush(pokerHand, followingValues)) {
          result = Hcm.straightFlushMapping(followingValues);
        }
      }
    } else if(sameColor !== null) {
      result = Hcm.flushMapping(pokerHand, sameColor);
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

  checkIfWinnersAreEven(results) {
    let i = 1;
    while(i < results.length) {
      if(results[0].combination.INT === results[i].combination.INT) {
        if(CombinationsComparator.compareCombinations(results[0].combination, results[i].combination) === 'TIE') {
          i += 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return results.slice(0, i);
  }

}

module.exports = HandComparator;
