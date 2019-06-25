'use strict';

class GameInstance {

  constructor(game, players) {
    this.title = game.title;
    this.mode = game.mode;
    this.buyIn = game.buyIn;
    this.maxPlayer = game.maxPlayer;
    this.players = game.players;
    this.cashPrice = game.cashPrice;
    this.initialStack = game.initialStack;
    this.creator = game.creator;
    this.bigBlind = game.initialStack / 100;
    this.smallBlind = this.bigBlind / 2;
    this.dealer = game.players[0];
    this.turn = {
      PREFLOP: 'PREFLOP',
      FLOP: 'FLOP',
      TURN: 'TURN',
      RIVER: 'RIVER'
    };
    this.players.push(new PlayerIG(players));
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
