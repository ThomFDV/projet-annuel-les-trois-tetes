'use strict';

const allStatus = Object.freeze({
  ELIMINATED: "Eliminé",
  FOLD: "Passé",
  ALLIN: "Tapis",
  CHECK: "Parole",
  BET: "Misé",
  INGAME: "En jeu"
});

class PlayerIG {

  constructor(player, initialStack) {
    this.email = player.email;
    this.hand = null;
    this.stack = initialStack;
    this.rank = null;
    this.status = allStatus.FOLD;
    this.personnalPot = 0;
    this.lastBet = 0;
  }
}

module.exports = {
  PlayerIG: PlayerIG,
  allStatus: allStatus
};
