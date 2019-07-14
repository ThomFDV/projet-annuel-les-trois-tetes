'use strict';

const Ao = require('./array.operations');
const Combinations = require('../models/combinations');
const CombinationsComparator = require('./combinations.comparator');

class HandCombinationMapping {
  fourOfAKindMapping(hand, FOAKValue) {
    let tempHand = Ao.withoutValue(hand, FOAKValue);
    return {
      combination: Combinations.FOUROFAKIND,
      value: FOAKValue,
      kicker: tempHand[2]
    }
  }

  straightFlushMapping(maxStraightValue) {
    return {
      combination: Combinations.STRAIGHTFLUSH,
      highValue: maxStraightValue
    }
  }

  fullHouseMapping(TOAKValue, pairValue) {
    return {
      combination: Combinations.FULLHOUSE,
      toakValue: TOAKValue,
      pair: pairValue
    } 
  }

  straightMapping(maxStraightValue) {
    return {
      combination: Combinations.STRAIGHT,
      highValue: maxStraightValue
    }
  }

  flushMapping(hand, colorValue) {
    let sameColorCards = Ao.getElementsByColor(hand, colorValue);
    return {
      combination: Combinations.FLUSH,
      colorCards: {
        first: sameColorCards[4],
        second: sameColorCards[3],
        third: sameColorCards[2],
        fourth: sameColorCards[1],
        fifth: sameColorCards[0]
      }
    }
  }

  threeOfAKindMapping(hand, TOAKValue) {
    let tempHand = Ao.withoutValue(hand, TOAKValue);
    return {
      combination: Combinations.THREEOFAKIND,
      value: TOAKValue,
      kickers: {
        first: tempHand[3],
        second: tempHand[2]
      }
    }
  }

  doublePairMapping(hand, firstPairValue, secondPairValue) {
    let tempHand = Ao.withoutValue(Ao.withoutValue(hand, firstPairValue), secondPairValue);
    return {
      combination: Combinations.DOUBLEPAIR,
      firstPair: firstPairValue,
      secondPair: secondPairValue,
      kicker: tempHand[2]
    }
  }

  pairMapping(hand, pairValue) {
    let tempHand = Ao.withoutValue(hand, pairValue);
    return {
      combination: Combinations.PAIR,
      value: pairValue,
      kickers: {
        first: tempHand[4],
        second: tempHand[3],
        third: tempHand[2]
      }
    }
  }

  highValueMapping(hand) {
    return {
      combination: Combinations.HIGHVALUE,
      highValue: hand[6],
      kickers: {
        first: hand[5],
        second: hand[4],
        third: hand[3],
        fourth: hand[2]
      }
    }
  }

  sortByCombinations(combinations, players) {
    let ok = true;
    while(ok) {
      ok = false;
      for(let index = 0; index < combinations.length - 1; index += 1) {
        let c1 = combinations[index];
        let c2 = combinations[index + 1];
        if(c1.combination.INT < c2.combination.INT ||
          (c1.combination.INT === c2.combination.INT &&
          CombinationsComparator.compareCombinations(c1, c2) === c2)) {
          let temp = combinations[index];
          combinations[index] = combinations[index + 1];
          combinations[index + 1] = temp;
          temp = players[index];
          players[index] = players[index + 1];
          players[index + 1] = temp;
          ok = true;
        }
      }
    }
    let results = [];
    for(let i = 0; i < combinations.length; i++) {
      results.push({
        player: players[i],
        combination: combinations[i]
      });
    }
    return results;
  }
}

module.exports = new HandCombinationMapping();
