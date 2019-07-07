'use strict';

const Player = require("./playerIG");

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
    this.mode = game.mode;
    this.buyIn = game.buyIn;
    this.maxPlayer = game.maxPlayer;
    this.cashPrice = game.cashPrice;
    this.initialStack = game.initialStack;
    this.players = [];
    this.players.push(new Player.PlayerIG(players[0], this.initialStack));
    this.creator = game.creator;
    this.bigBlind = game.initialStack / 100;
    this.smallBlind = this.bigBlind / 2;
    this.dealer = [];
    this.turn = turns.PREFLOP;
    this.currentTurn = turns.PREFLOP;
    this.board = [];
    this.deck = [];
    this.pot = 0;
    this.activePlayer = this.dealer;
    this.lastBet = 0;
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
    const dealerIdx = this.players.findIndex(x => x.email === this.dealer.email);
    if (dealerIdx + 1 >= this.players.length) {
      this.players[0].stack -= this.smallBlind;
      this.players[0].lastBet = this.smallBlind;
      this.players[1].stack -= this.bigBlind;
      this.players[1].lastBet = this.bigBlind;
    } else if (dealerIdx + 2 >= this.players.length) {
      this.players[dealerIdx + 1].stack -= this.smallBlind;
      this.players[dealerIdx + 1].lastBet = this.smallBlind;
      this.players[0].stack -= this.bigBlind;
      this.players[0].lastBet = this.bigBlind;
    } else {
      this.players[dealerIdx + 1].stack -= this.smallBlind;
      this.players[dealerIdx + 1].lastBet = this.smallBlind;
      this.players[dealerIdx + 2].stack -= this.bigBlind;
      this.players[dealerIdx + 2].lastBet = this.bigBlind;
    }
    this.pot = this.smallBlind + this.bigBlind;
    this.lastBet = this.bigBlind;
    this.nextActivePlayer();
    this.nextActivePlayer();
    this.nextActivePlayer();
  }

  bet(value) {
    this.activePlayer.lastBet = value;
    this.activePlayer.personnalPot = value;
    this.activePlayer.stack -= value;
    this.pot += value;
    this.lastBet = value;
  }

  fold() {
    this.activePlayer.status = Player.allStatus.FOLD;
  }

  updateDealer() {
    const selector = Math.floor(Math.random() * this.players.length);
    this.dealer = this.players[selector];
    this.activePlayer = this.players[selector];
  }

  kickPlayer() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].status === Player.allStatus.ELIMINATED) {
        delete this.players[i];
      }
      this.players[i].status = Player.allStatus.INGAME;
    }
  }

  nextActivePlayer() {
    //Verifier les status des joueurs, si ils ont tous jouer faire passer au turn suivant
    //Remettre le lastBet à 0 si le turn a changé
    let playerIdx = this.players.findIndex(x => x.email === this.activePlayer.email);
    if (playerIdx + 1 > this.players.length - 1) {
      this.activePlayer = this.players[0];
      return;
    }
    this.activePlayer = this.players[playerIdx + 1];
    if (this.activePlayer.status === Player.allStatus.FOLD) {
      this.nextActivePlayer();
    }
    //Faire plus simple en trouvant l'index de l'activePlayer dans players
    //Vérifier si le prochain est bien INGAME
    //Si il est pas INGAME et qu'il n'est pas FOLD non plus, passer au turn suivant
    //Si il est FOLD ajouter 1 tant qu'on trouve quelque chose de valide
    //Ensuite dire que maintenant activePlayer est cet index + 1
  }

  updateTurn() {
    //Mettre tous les joueurs qui ne sont pas FOLD, ELIMINATED OU ALLIN à INGAME
    //Puis passer au turn suivant
  }
}

module.exports = GameInstance;
