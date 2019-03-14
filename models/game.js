'use strict';

let fhc = require("fh-cards");
let StandardDeck = fhc.StandardDeck;

class Game {

    constructor(id) {
        this.id = id;
    }

    createGame() {

        let deck = new StandardDeck();
        deck.shuffle();

        let hand = deck.draws(2);
        hand[0].toString();
        hand[1].toString();
    }
}