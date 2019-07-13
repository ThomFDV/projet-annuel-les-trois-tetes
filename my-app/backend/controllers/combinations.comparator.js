'use strict';

const Combinations = require('../models/combinations');

class CombinationComparator {
  static compareCombinations(firstCombination, secondCombination) {
    switch(firstCombination.combination) {
      case Combinations.HIGHVALUE:
        return this.getBestHighValue(firstCombination, secondCombination);
      case Combinations.PAIR:
        return this.getBestPair(firstCombination, secondCombination);
      case Combinations.DOUBLEPAIR:
        return this.getBestDoublePair(firstCombination, secondCombination);
      case Combinations.THREEOFAKIND:
        return this.getBestThreeOfAKind(firstCombination, secondCombination);
      case Combinations.FLUSH:
        return this.getBestFlush(firstCombination, secondCombination);
      case Combinations.STRAIGHT:
        return this.getBestStraight(firstCombination, secondCombination);
      case Combinations.FULLHOUSE:
        return this.getBestFullHouse(firstCombination, secondCombination);
      case Combinations.FOUROFAKIND:
        return this.getBestFourOfAKind(firstCombination, secondCombination);
      case Combinations.STRAIGHTFLUSH:
        return this.getBestStraightFlush(firstCombination, secondCombination);
    }
  }

  static getBestHighValue(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    if(combination1.kickers.first[0] !== combination2.kickers.first[0]) {
      return combination1.kickers.first[0] > combination2.kickers.first[0] ? combination1 : combination2;
    } else if (combination1.kickers.second[0] !== combination2.kickers.second[0]) {
      return combination1.kickers.second[0] > combination2.kickers.second[0] ? combination1 : combination2;
    } else if (combination1.kickers.third[0] !== combination2.kickers.third[0]) {
      return combination1.kickers.third[0] > combination2.kickers.third[0] ? combination1 : combination2;
    } else if (combination1.kickers.fourth[0] !== combination2.kickers.fourth[0]) {
      return combination1.kickers.fourth[0] > combination2.kickers.fourth[0] ? combination1 : combination2;
    }
    console.log('HIGH VALUE TIE');
    return 'TIE';
  }

  static getBestPair(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    if(combination1.kickers.first[0] !== combination2.kickers.first[0]) {
      return combination1.kickers.first[0] > combination2.kickers.first[0] ? combination1 : combination2;
    } else if (combination1.kickers.second[0] !== combination2.kickers.second[0]) {
      return combination1.kickers.second[0] > combination2.kickers.second[0] ? combination1 : combination2;
    } else if (combination1.kickers.third[0] !== combination2.kickers.third[0]) {
      return combination1.kickers.third[0] > combination2.kickers.third[0] ? combination1 : combination2;
    }
    console.log('PAIR TIE');
    return 'TIE';
  }

  static getBestDoublePair(combination1, combination2) {
    if(combination1.firstPair !== combination2.firstPair) {
      return combination1.firstPair > combination2.firstPair ? combination1 : combination2;
    }
    if(combination1.secondPair !== combination2.secondPair) {
      return combination1.secondPair > combination2.secondPair ? combination1 : combination2;
    }
    if(combination1.kicker[0] !== combination2.kicker[0]) {
      return combination1.kicker[0] > combination2.kicker[0] ? combination1 : combination2;
    }
    console.log('DOUBLE PAIR TIE');
    return 'TIE';
  }

  static getBestThreeOfAKind(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    if(combination1.kickers.first[0] !== combination2.kickers.first[0]) {
      return combination1.kickers.first[0] > combination2.kickers.first[0] ? combination1 : combination2;
    } else if (combination1.kickers.second[0] !== combination2.kickers.second[0]) {
      return combination1.kickers.second[0] > combination2.kickers.second[0] ? combination1 : combination2;
    }
    console.log('TOAK TIE');
    return 'TIE';
  }

  static getBestFlush(combination1, combination2) {
    if(combination1.colorCards.first[0] !== combination2.colorCards.first[0]) {
      return combination1.colorCards.first[0] > combination2.colorCards.first[0] ? combination1 : combination2;
    } else if (combination1.colorCards.second[0] !== combination2.colorCards.second[0]) {
      return combination1.colorCards.second[0] > combination2.colorCards.second[0] ? combination1 : combination2;
    } else if (combination1.colorCards.third[0] !== combination2.colorCards.third[0]) {
      return combination1.colorCards.third[0] > combination2.colorCards.third[0] ? combination1 : combination2;
    } else if (combination1.colorCards.fourth[0] !== combination2.colorCards.fourth[0]) {
      return combination1.colorCards.fourth[0] > combination2.colorCards.fourth[0] ? combination1 : combination2;
    } else if (combination1.colorCards.fifth[0] !== combination2.colorCards.fifth[0]) {
      return combination1.colorCards.fifth[0] > combination2.colorCards.fifth[0] ? combination1 : combination2;
    }
    console.log('FLUSH TIE');
    return 'TIE'
  }

  static getBestStraight(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    console.log('STRAIGHT TIE');
    return 'TIE';
  }

  static getBestFullHouse(combination1, combination2) {
    if(combination1.toakValue !== combination2.toakValue) {
      return combination1.toakValue > combination2.toakValue ? combination1 : combination2;
    }
    if(combination1.pair !== combination2.pair) {
      return combination1.pair > combination2.pair ? combination1 : combination2;
    }
    console.log('FULL HOUSE');
    return 'TIE';
  }

  static getBestFourOfAKind(combination1, combination2) {
    if(combination1.value !== combination2.value) {
      return combination1.value > combination2.value ? combination1 : combination2;
    }
    if(combination1.kicker[0] !== combination2.kicker[0]) {
      return combination1.kicker[0] > combination2.kicker[0] ? combination1 : combination2;
    }
    console.log('FOAK TIE');
    return 'TIE';
  }

  static getBestStraightFlush(combination1, combination2) {
    if(combination1.highValue !== combination2.highValue) {
      return combination1.highValue > combination2.highValue ? combination1 : combination2;
    }
    console.log('STRAIGHT FLUSH TIE');
    return 'TIE';
  }
}

module.exports = CombinationComparator;
