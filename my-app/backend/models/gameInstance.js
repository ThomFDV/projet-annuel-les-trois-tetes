'use strict';

const Player = require("./playerIG");
const Deck = require("./deck");

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

  /*
  Déroulement d'une partie :
  - On mélange créer un nouveau paquet de carte
  - On met tous les joueurs ayant un stack supérieur à 0 leur status INGAME
  - On mélange le deck
  - On le distribue à chaque joueur
  - On détermine le dealer
  =============== PREFLOP ===================
  - On fait miser les blinds au SB et BB
  - On donne la parole au joueur suivant
  - Le joueur décide soit de se coucher, de check, de call ou de raise
    - Si il raise :
      - On vérifie que sont raise soit > ou = au raise précédent
      - On vérifie que le montant n'est pas négatif
      - On vérifie que le montant n'est pas supérieur à son stack
      - On change son status en BET

    - Si il call :
      - Mêmes vérifications que précédemment

    - Si il fold :
      - On MAJ son status

  - Il fait sont action est on passe au joueur suivant
  - Quand tous les joueurs ont joués, on passe au turn suivant
  =============== FLOP ======================
  - On vérifie les joueurs encore en course
  - On met les 3 cartes sur le board
  - Ensuite on va MAJ l'activeplayer par celui qui est après le dealer
  - Tant que le prochain joueur est FOLD on incremment de 1
  - On laisse les joueurs parler
  - Quand c'est finit on passe au turn suivant
  =============== TURN ======================
  - On vérifie les joueurs encore en course
  - On met la carte sur le board
  - Pareil que précédemment
  =============== River =====================
  - On vérifie les joueurs encore en course
  - On met la carte sur le board
  - Pareil que précédemment
  - Quand chacun des joueurs ont parlés on affiche les cartes et on détermine qui a gagné
  - Une fois que c'est déterminé, on distribue le pot au joueur gagnant
  - Les joueurs ayant un stack à 0 on change le status en ELIMINATED
  - On remet à jour le status de tous les autres joueurs à INGAME
  - On retire le joueur de la partie
  - On recommence
   */

  startGame() {
    this.deck = new Deck();
    this.deck.shuffleDeck();
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
    if (value + this.activePlayer.lastBet === 0 && this.lastBet === 0) {
      //Check
      this.activePlayer.status = Player.allStatus.CHECK;
      console.log(`\nCheck de ${this.activePlayer.email}!\n`);
      return code;
    } else if (value + this.activePlayer.lastBet < this.lastBet || value + this.activePlayer.lastBet < this.bigBlind) {
      code = -1;
    } else if (value + this.activePlayer.lastBet > this.activePlayer.stack) {
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
    if (this.activePlayer.stack === 0) {
      this.activePlayer.status = Player.allStatus.ALLIN;
    }
    return code;
  }

  fold() {
    this.activePlayer.status = Player.allStatus.FOLD;
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

  kickPlayer() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].status === Player.allStatus.ELIMINATED) {
        delete this.players[i];
      }
      this.players[i].status = Player.allStatus.INGAME;
    }
  }

  checkTurn() {
    let allPlayed = true;
    for (const player of this.players) {
      if (player.status === Player.allStatus.INGAME) {
        allPlayed = false;
      } else if (player.status === Player.allStatus.BET && player.personnalPot < this.lastBet) {
        allPlayed = false;
      }
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
          this.currentTurn = turns.RIVER;
          this.startGame();
          break;
      }
      this.lastBet = 0;
      for (let player of this.players) {
        player.lastBet = 0;
      }
    }
  }

  checkWinner() {
    //TODO
  }
  nextActivePlayer() {
    this.checkTurn();
    let playerIdx = this.players.findIndex(x => x.email === this.activePlayer.email);
    if (playerIdx + 1 > this.players.length - 1) {
      this.activePlayer = this.players[0];
      return;
    }
    this.activePlayer = this.players[playerIdx + 1];
    if (this.activePlayer.status === Player.allStatus.FOLD) {
      this.nextActivePlayer();
    }
  }
}

module.exports = GameInstance;
