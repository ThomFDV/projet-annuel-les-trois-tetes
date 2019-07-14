'use strict';

// const Color = require('../models/color');
// const Value = require('../models/value');
const Card = require('../models/card');

let cardClass = new Card();

class ArrayOperations {
  sortByAsc(array) {
    let ok = true;
    while(ok) {
      ok = false;
      for(let i = 0; i < array.length - 1; i++) {
        if(array[i][0] > array[i+1][0]) {
          let temp = array[i];
          array[i] = array[i+1];
          array[i+1] = temp;
          ok = true;
        }
      }
    }
    return array;
  }

  getSameValue(array) {
    let valueToFind = array[0][0];
    let max = 1;
    let current = 1;
    for(let i = 1; i < array.length; i++) {
      if(array[i][0] === valueToFind) {
        current += 1;
      } else {
        if(current > max) max = current;
        current = 1;
        valueToFind = array[i][0];
      }
    }
    return max > current ? max : current;
  }

  getColor(array) {
    let current = 0;
    for(let colors of cardClass.color) {
      current = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i][1] === colors) current += 1;
      }
      if(current >= 5) return colors;
    }
    return null;
  }

  getFollowingCards(array) {
    let current = 1;
    let valueToCheck = array[0][0];
    if(array[6][0] === 14 && array[0][0] === 2) current = 2;
    for(let i = 1; i < array.length; i++) {
      if(valueToCheck + 1 === array[i][0]) {
        current += 1;
      } else if(valueToCheck !== array[i][0]){
        if(current >= 5) {
          return array[i-1][0];
        }
        if(i >= 3) return 0;
        current = 1;
      }
      valueToCheck = array[i][0];
    }
    if(current >= 5) return array[6];
    return 0;
  }

  withoutValue(array, valueToExtract) {
    let newArray = [];
    for(let card of array) {
      if(card[0] !== valueToExtract) {
        newArray.push(card);
      }
    }
    return newArray;
  }

  getElementsByColor(array, color) {
    let newArray = [];
    for(let card of array) {
      if(card[1] === color) newArray.push(card);
    }
    return newArray;
  }
}

module.exports = new ArrayOperations();
