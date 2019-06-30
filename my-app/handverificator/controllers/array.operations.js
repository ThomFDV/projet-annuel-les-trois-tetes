'use strict';

const Color = require('../models/color');
const Value = require('../models/value');

class ArrayOperations {
  sortByAsc(array) {
    let ok = true;
    while(ok) {
      ok = false;
      for(let i = 0; i < array.length - 1; i++) {
        if(array[i].value > array[i+1].value) {
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
    let valueToFind = array[0].value;
    let max = 1;
    let current = 1;
    for(let i = 1; i < array.length; i++) {
      if(array[i].value === valueToFind) {
        current += 1;
      } else {
        if(current > max) max = current;
        current = 1;
        valueToFind = array[i].value;
      }
    }
    return max > current ? max : current;
  }

  getColor(array) {
    let current = 0;
    for(let colors in Color) {
      current = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].color === colors) current += 1;
      }
      if(current >= 5) return colors;
    }
    return Color.EMPTY;
  }

  getFollowingCards(array) {
    let current = 1;
    let valueToCheck = array[0].value;
    if(array[6].value === Value.ACE && array[0].value === Value.TWO) current = 2;
    for(let i = 1; i < array.length; i++) {
      if(valueToCheck + 1 === array[i].value) {
        current += 1;
      } else if(valueToCheck !== array[i].value){
        if(current >= 5) {
          return array[i-1].value;
        }
        if(i >= 3) return 0;
        current = 1;
      }
      valueToCheck = array[i].value;
    }
    if(current >= 5) return array[6];
    return 0;
  }

  withoutValue(array, valueToExtract) {
    let newArray = [];
    for(let card of array) {
      if(card.value !== valueToExtract) {
        newArray.push(card);
      }
    }
    return newArray;
  }

  getElementsByColor(array, color) {
    let newArray = [];
    for(let card of array) {
      if(card.color === color) newArray.push(card);
    }
    return newArray;
  }
}

module.exports = new ArrayOperations();