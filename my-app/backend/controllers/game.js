"use strict";

const Game = require("../models/game");
const GameInstance = require("../models/gameInstance");

let games = [];

class Gameplay {

  findGame(id) {
     for (let i; i < games.length; i++) {
       if (games[i].id === id) {
         return games[i];
       }
     }
     return undefined;
  }

  addPlayer(id, player) {
    let game = this.findGame(id);
    game.players.push(new PlayerIG(player, game.initialStack));
  }

  async create(req, res) {

    const title = req.body.title;
    const mode = req.body.mode;
    const buyIn = req.body.buyIn;
    const maxPlayer = req.body.maxPlayer;
    const players = [{
      email: req.user.email
    }];
    const cashPrice = req.body.cashPrice;
    const initialStack = req.body.initialStack;
    const creator = req.user.email;

    try {
      const game = new Game({
        title,
        mode,
        buyIn,
        maxPlayer,
        players,
        cashPrice,
        initialStack,
        creator
      });
      await game.save();
      const gameInfo = {
        title,
        mode,
        buyIn,
        maxPlayer,
        players,
        cashPrice,
        initialStack,
        creator
      };
      const myGame = new GameInstance(gameInfo, players);
      games.push(myGame);
      console.log(`\n${games[0].initialStack}\n`);
      return res.status(201).json({"message": "Partie créée !"}).end();
    } catch {
      res.status(409).json({
        message: "Problème lors de l'ajout dans la bdd"
      }).end();
    }
  }

  async getCollection(req, res) {
    const game = await Game.find().sort({updatedAt: "desc"});
    res.json(game);
  }

  async getGame(req, res) {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(400).end();
    }
    return res.json(game).status(200).end();
  }

  async join(req, res) {

    const id = req.params.id;
    let isAlready = false;
    const game = await Game.findById(id, (err, doc) => {
      if (err) return err;
      const email = req.user.email;
      doc.players.forEach((player) => {
        if (player.email === email) {
          isAlready = true;
        }
      });
      if (!isAlready) {
        const player = {
          email
        };
        doc.players.push(player);
        doc.save();
        this.addPlayer(id, player);
      }
    });
    if (isAlready) {
      res.status(401).send("Vous êtes déjà connecté !");
    } else {
      res.json(game);
    }
  }

  async leave(req, res) {
    const game = await Game.updateOne({
      _id: req.params.id
    }, {
      $pull: {
        players: {
          email: req.user.email
        }
      }
    }, (err) => {
      if (err) {
        return res.sendStatus(400);
      }
    });
    res.sendStatus(200).end();
  }
}

module.exports = Gameplay;
