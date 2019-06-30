'use strict';

const models = require('./models');
const controllers = require('./controllers');
const Color = models.Color;
const Value = models.Value;
const Card = models.Card;
const Hc = controllers.HandComparator;

let board = [];
board.push(new Card(Color.SPADE, Value.FOUR));
board.push(new Card(Color.DIAMOND, Value.JACK));
board.push(new Card(Color.SPADE, Value.FIVE));
board.push(new Card(Color.CLUBS, Value.QUEEN));
board.push(new Card(Color.SPADE, Value.SIX));


let allHands = [];

let pokerHand = [];
pokerHand.push(new Card(Color.CLUBS, Value.KING));
pokerHand.push(new Card(Color.HEART, Value.KING));

let pokerHand2 = []
pokerHand2.push(new Card(Color.DIAMOND, Value.JACK));
pokerHand2.push(new Card(Color.CLUBS, Value.NINE));

let pokerHand3 = []; 
pokerHand3.push(new Card(Color.DIAMOND, Value.SIX));
pokerHand3.push(new Card(Color.DIAMOND, Value.SIX));

let pokerHand4 = [];
pokerHand4.push(new Card(Color.SPADE, Value.KING));
pokerHand4.push(new Card(Color.HEART, Value.EIGHT));

let pokerHand5 = [];
pokerHand5.push(new Card(Color.CLUBS, Value.EIGHT));
pokerHand5.push(new Card(Color.CLUBS, Value.SEVEN));

allHands.push(pokerHand);
allHands.push(pokerHand2);
allHands.push(pokerHand3);
allHands.push(pokerHand4);
allHands.push(pokerHand5);

let HandComparator = new Hc(allHands, board);
HandComparator.compareHands();