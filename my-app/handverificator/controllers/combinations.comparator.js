'use strict';

const Combinations = require('../models/combinations');

class CombinationComparator {
  static compareCombinations(firstCombination, secondCombination) {
    switch(firstCombination.combination) {
      case Combinations.HIGHVALUE:
        return 'HighValue';
      case Combinations.PAIR:
        return 'Pair';
      case Combinations.DOUBLEPAIR:
        return 'DoublePair';
      case Combinations.THREEOFAKIND:
        return 'TOAK';
      case Combinations.FLUSH:
        return 'Flush';
      case Combinations.STRAIGHT:
        return 'Straight';
      case Combinations.FULLHOUSE:
        return 'Full House';
      case Combinations.FOUROFAKIND:
        return 'FourOfAKind';
      case Combinations.STRAIGHTFLUSH:
        return 'StraightFlush';
    }
  }

  getBestHighValue(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    for(let key in combination1.kickers) {
      if(combination1.kicker[key] !== combination2.kicker[key]) {
        return combination1.kicker[key] > combination2.kicker[key] ? combination1 : combination2;
      }
    }
    return 'TIE';
  }

  getBestPair(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    for(let key in combination1.kickers) {
      if(combination1.kicker[key] !== combination2.kicker[key]) {
        return combination1.kicker[key] > combination2.kicker[key] ? combination1 : combination2;
      }
    }
    return 'TIE';
  }

  getBestDoublePair(combination1, combination2) {
    if(combination1.firstPair !== combination2.firstPair) {
      return combination1.firstPair > combination2.firstPair ? combination1 : combination2;
    }
    if(combination1.secondPair !== combination2.secondPair) {
      return combination1.secondPair > combination2.secondPair ? combination1 : combination2;
    }
    if(combination1.kicker !== combination2.kicker) {
      return combination1.kicker > combination2.kicker ? combination1 : combination2;
    }
    return 'TIE';
  }

  getBestThreeOfAKind(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    for(let key in combination1.kickers) {
      if(combination1.kicker[key] !== combination2.kicker[key]) {
        return combination1.kicker[key] > combination2.kicker[key] ? combination1 : combination2;
      }
    }
    return 'TIE';
  }

  getBestFlush(combination1, combination2) {
    for(let index in combination1.colorCards) {
      if(combination1.colorCards[index] !== combination2.colorCards[index]) {
        return combination1.colorCards[index] > combination2.colorCards[index] ? combination1 : combination2;
      }
    }
    return 'TIE'
  }

  getBestStraight(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    return 'TIE';
  }

  getBestFullHouse(combination1, combination2) {
    if(combination1.toakValue !== combination2.toakValue) {
      return combination1.toakValue > combination2.toakValue ? combination1 : combination2;
    }
    if(combination1.pair !== combination2.pair) {
      return combination1.pair > combination2.pair ? combination1 : combination2;
    }
    return 'TIE';
  }

  getBestFourOfAKind(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    if(combination1.kicker !== combination2.kicker) {
      return combination1.kicker > combination2.kicker ? combination1 : combination2;
    }
    return 'TIE';
  }

  getBestStraightFlush(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    return 'TIE';
  }
}

module.exports = CombinationComparator;