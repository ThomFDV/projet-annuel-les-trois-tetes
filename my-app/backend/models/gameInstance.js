'use strict';

const Player = require("./playerIG");
const Deck = require("./deck");
const Hc = require("../controllers/hand.comparator");
const _ = require("lodash");

const turns = Object.freeze({
  PREFLOP: 'PREFLOP',
  FLOP: 'FLOP',
  TURN: 'TURN',
  RIVER: 'RIVER'
});

class GameInstance {

  constructor(game, players) {
    this.id = game.id;
    this.title = game.title;
    this.players = [];
    this.players.push(new Player.PlayerIG(players[0], game.initialStack));
    this.dealer = [];
    this.sbPlayer = [];
    this.bbPlayer = [];
    this.currentTurn = turns.PREFLOP;
    this.board = [];
    this.pot = 0;
    this.activePlayer = [];
    this.lastBet = 0;
    this.creator = game.creator;
    this.mode = game.mode;
    this.buyIn = game.buyIn;
    this.maxPlayer = game.maxPlayer;
    this.cashPrice = game.cashPrice;
    this.initialStack = game.initialStack;
    this.bigBlind = game.initialStack / 100;
    this.smallBlind = this.bigBlind / 2;
    this.deck = [];
  }

  startGame() {
    this.deck = new Deck();
    this.deck.shuffleDeck();
    this.board = [];
    this.currentTurn = turns.PREFLOP;
    this.distributeHands();
    this.updateDealer();
    this.updateSbPlayer();
    this.updateBbPlayer();
    this.putBlinds();
  }

  distributeHands() {
    for (let player of this.players) {
      player.hand = [this.deck.draw(), this.deck.draw()];
      player.status = Player.allStatus.INGAME;
      player.personnalPot = 0;
      player.lastBet = 0;
    }
  }

  dropCardsOnBoard(nbrToDraw) {
    for (let i = 0; i < nbrToDraw; i++) {
      this.board.push(this.deck.draw());
    }
  }

  putBlinds() {
    this.sbPlayer.stack -= this.smallBlind;
    this.sbPlayer.lastBet = this.smallBlind;
    this.sbPlayer.personnalPot = this.smallBlind;
    this.bbPlayer.stack -= this.bigBlind;
    this.bbPlayer.lastBet = this.bigBlind;
    this.bbPlayer.personnalPot = this.bigBlind;
    this.pot = this.smallBlind + this.bigBlind;
    this.lastBet = this.bigBlind;
    this.nextActivePlayer();
    this.nextActivePlayer();
    this.nextActivePlayer();
  }

  bet(value) {
    let code = 0;
    if (value === this.activePlayer.stack) {
      this.lastBet = this.activePlayer.lastBet + value;
      this.activePlayer.personnalPot += value;
      this.activePlayer.lastBet = value;
      this.activePlayer.stack -= value;
      this.activePlayer.status = Player.allStatus.ALLIN;
      this.pot += value;
      return code;
    }
    if (value + this.activePlayer.lastBet === 0 && this.lastBet === 0) {
      //Check
      this.activePlayer.status = Player.allStatus.CHECK;
      console.log(`\nCheck de ${this.activePlayer.email}!\n`);
      return code;
    } else if (value + this.activePlayer.personnalPot < this.lastBet || value + this.activePlayer.lastBet < this.bigBlind) {
      code = -1;
    } else if (value > this.activePlayer.stack) {
      //Relance pas
      code = 1;
    } else if (value + this.activePlayer.lastBet === this.lastBet) {
      //Faire les changements pour le call
      this.activePlayer.personnalPot += value;
      this.activePlayer.lastBet = value;
      this.activePlayer.stack -= value;
      this.activePlayer.status = Player.allStatus.BET;
      this.pot += value;
      console.log(`\nCall de ${this.activePlayer.email} ! Mise de ${value}, avec un pot perso de ` +
                  `${this.activePlayer.personnalPot}\n`);
    } else {
      //Raise
      this.lastBet = this.activePlayer.lastBet + value;
      this.activePlayer.personnalPot += value;
      this.activePlayer.lastBet = value;
      this.activePlayer.stack -= value;
      this.activePlayer.status = Player.allStatus.BET;
      this.pot += value;
      console.log(`\nRaise de ${this.activePlayer.email} ! Mise de ${value}, avec un pot perso de ` +
                  `${this.activePlayer.personnalPot}\n`);
    }
    return code;
  }

  fold() {
    this.activePlayer.status = Player.allStatus.FOLD;
    this.nextActivePlayer();
  }

  updateDealer() {
    const selector = Math.floor(Math.random() * this.players.length);
    this.dealer = this.players[selector];
    this.activePlayer = this.players[selector];
  }

  updateSbPlayer() {
    let playerIdx = this.players.findIndex(x => x.email === this.dealer.email);
    if (playerIdx + 1 > this.players.length - 1) {
      this.sbPlayer = this.players[0];
      return;
    }
    this.sbPlayer = this.players[playerIdx + 1];
  }

  updateBbPlayer() {
    let playerIdx = this.players.findIndex(x => x.email === this.sbPlayer.email);
    if (playerIdx + 1 > this.players.length - 1) {
      this.bbPlayer = this.players[0];
      return;
    }
    this.bbPlayer = this.players[playerIdx + 1];
  }

  checkTurn() {
    let allPlayed = true;
    let playersOut = [];
    for (const player of this.players) {
      if (player.status === Player.allStatus.INGAME) {
        allPlayed = false;
      } else if (player.status === Player.allStatus.BET || player.status === Player.allStatus.ALLIN) {
        for (let p of this.players) {
          if ((p.status === Player.allStatus.BET || p.status === Player.allStatus.CHECK)
              && (p.personnalPot !== player.personnalPot && player.status !== Player.allStatus.ALLIN)) {
            allPlayed = false;
          } else if (player.status === Player.allStatus.ALLIN &&
              ((p.status === Player.allStatus.BET || p.status === Player.allStatus.CHECK)
                  && p.lastBet !== player.lastBet)) {
            allPlayed = false;
          }
        }
      } else if (player.status === Player.allStatus.FOLD) {
        playersOut.push(player);
      }
    }
    if (playersOut.length >= this.players.length - 1) {
      this.players[this.players.findIndex(x => x.status !== Player.allStatus.FOLD)].stack += this.pot;
      this.startGame();
      return true;
    }
    if (allPlayed) {
      switch (this.currentTurn) {
        case "PREFLOP":
          this.currentTurn = turns.FLOP;
          this.dropCardsOnBoard(3);
          for (let player of this.players) {
            if (player.status !== Player.allStatus.FOLD) {
              player.status = Player.allStatus.INGAME;
            }
          }
          this.activePlayer = this.dealer;
          break;
        case "FLOP":
          this.currentTurn = turns.TURN;
          this.dropCardsOnBoard(1);
          for (let player of this.players) {
            if (player.status !== Player.allStatus.FOLD) {
              player.status = Player.allStatus.INGAME;
            }
          }
          this.activePlayer = this.dealer;
          break;
        case "TURN":
          this.currentTurn = turns.RIVER;
          this.dropCardsOnBoard(1);
          for (let player of this.players) {
            if (player.status !== Player.allStatus.FOLD) {
              player.status = Player.allStatus.INGAME;
            }
          }
          this.activePlayer = this.dealer;
          break;
        case "RIVER":
          this.checkWinner();
          for (let player of this.players) {
            if (player.stack === 0) {
              player.status = Player.allStatus.ELIMINATED;
            }
          }
          _.remove(this.players, p => p.status === Player.allStatus.ELIMINATED);
          this.startGame();
          return true;
      }
      this.lastBet = 0;
      for (let player of this.players) {
        player.lastBet = 0;
      }
      return false;
    }
  }

  checkWinner() {
    let allHands = [];
    let playersIn = [];
    for(let player of this.players) {
      if (player.status === Player.allStatus.FOLD || player.status === Player.allStatus.ELIMINATED) continue;
      allHands.push(player.hand);
      playersIn.push(player);
    }
    let HandComparator = new Hc(allHands, this.board);
    let results = HandComparator.compareHands(playersIn);
    let playerIdx;
    if(results.length === 1) {
      playerIdx = this.players.findIndex(x => x.email === results[0].player.email);
      for (let p of playersIn) {
        if (this.players[playerIdx].lastBet < p.lastBet) {
          p.stack += p.personnalPot - this.players[playerIdx].personnalPot;
          this.pot -= p.personnalPot - this.players[playerIdx].personnalPot;
        }
      }
      this.players[playerIdx].stack += this.pot;
      console.log('Il y a un gagnant : ' + results[0].player.email);
    } else {
      console.log('Il y a une égalité : ');
      let playersConcerned = [];
      for(let r of results) {
        playerIdx = this.players.findIndex(x => x.email === r.player.email);
        playersConcerned.push(playerIdx);
        this.players[playerIdx].stack += this.players[playerIdx].personnalPot;
        this.pot -= this.players[playerIdx].personnalPot;
        console.log(r.player.email);
      }
      if (this.pot > 0) {
        for (let i of playersConcerned) {
          this.players[i].stack += this.pot / results.length;
        }
      } 
    }
  }

  nextActivePlayer() {
    let newGame = this.checkTurn();
    if (newGame) return;
    let playerIdx = this.players.findIndex(x => x.email === this.activePlayer.email);
    if (playerIdx + 1 > this.players.length - 1) {
      this.activePlayer = this.players[0];
    } else {
      this.activePlayer = this.players[playerIdx + 1];
    }
    if (this.activePlayer.status === Player.allStatus.FOLD
        || this.activePlayer.status === Player.allStatus.ELIMINATED) {
      this.nextActivePlayer();
    }
  }
}

module.exports = GameInstance;
