"use strict";

const Game = require("../models/game");
const GameInstance = require("../models/gameInstance");
const mongoose = require("mongoose");

let games = [];

let findGame = (id) => {
  for (let i = 0; i < games.length; i++) {
    if (games[i].id == id) {
      return games[i];
    }
  }
  return undefined;
};

let addPlayer = (id, player) => {
  let game = findGame(id);
  game.players.push(new PlayerIG(player, game.initialStack));
};

exports.create = async (req, res, next) => {
  let gameId = new mongoose.Types.ObjectId();
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
      _id: gameId,
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
      id: gameId,
      title,
      mode,
      buyIn,
      maxPlayer,
      cashPrice,
      initialStack,
      creator
    };
    const myGame = new GameInstance(gameInfo, players);
    games.push(myGame);
    return res.status(201).json({
        "message": "Partie créée !",
        game: myGame
      }).end();
  } catch {
    res.status(409).json({
      message: "Problème lors de l'ajout dans la bdd"
    }).end();
  }
};

exports.getCollection = async (req, res) => {
  const game = await Game.find().sort({updatedAt: "desc"});
  res.json(game);
};

exports.getGame = async (req, res) => {
  let id = req.params.id;
  const game = await findGame(id);
  if (!game) {
    return res.status(400).end();
  }
  return res.json(game).status(200).end();
};

exports.join = async (req, res, next) => {
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
      addPlayer(id, player);
    }
  });
  if (isAlready) {
    res.status(401).send("Vous êtes déjà connecté !");
  } else {
    res.json(game);
  }
};

exports.leave = async (req, res) => {
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
};
