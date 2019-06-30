'use strict';

const PlayerIG = require("./playerIG");

class GameInstance {

  constructor(game, players) {
    this.id = game.id;
    this.title = game.title;
    this.mode = game.mode;
    this.buyIn = game.buyIn;
    this.maxPlayer = game.maxPlayer;
    this.players = [];
    this.players.push(new PlayerIG(players[0], this.initialStack));
    this.cashPrice = game.cashPrice;
    this.initialStack = game.initialStack;
    this.creator = game.creator;
    this.bigBlind = game.initialStack / 100;
    this.smallBlind = this.bigBlind / 2;
    this.dealer = this.players[0];
    this.turn = {
      PREFLOP: 'PREFLOP',
      FLOP: 'FLOP',
      TURN: 'TURN',
      RIVER: 'RIVER'
    };
    this.board = [];
    this.deck = [];
    this.pot = 0;
    this.activePlayer = undefined;
    this.lastBet = 0;
  }

  // bet() {
  //   blabla;
  // }
}

module.exports = GameInstance;
