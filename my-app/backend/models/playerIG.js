'use strict';

class PlayerIG {

  constructor(player, initialStack) {
    console.log("\nil rentre bien la\n");
    this.email = player.email;
    this.hand = "back";
    this.initialStack = initialStack;
    this.rank = 1;
    this.status = {
      ELIMINATED: "Eliminé",
      FOLD: "Passé",
      ALLIN: "Tapis",
      CHECK: "Parole",
      BET: "Misé",
      INGAME: "En jeu"
    };
    this.personnalPot = 0;
    this.lastBet = 0;
  }
}

module.exports = PlayerIG;
