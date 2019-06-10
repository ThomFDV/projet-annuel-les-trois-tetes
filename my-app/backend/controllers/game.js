"use strict";

const Game = require("../models/game");

exports.create = async (req, res, next) => {

  const title = req.body.title;
  const mode = req.body.mode;
  const buyIn = req.body.buyIn;
  const maxPlayer = req.body.maxPlayer;
  const players = [{
    email: req.user.email,
    cards: "back",
    chipsAmount: 500,
    rank: 1
  }];
  const cashPrice = req.body.cashPrice;
  const creator = req.user.email;

  try {
    const game = new Game({
      title,
      mode,
      buyIn,
      maxPlayer,
      players,
      cashPrice,
      creator
    });
    await game.save();
    return res.status(201).json({"message": "Partie créée !"}).end();
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

exports.join = async (req, res, next) => {
  let isAlready = false;
  const game = await Game.findById(req.params.id, (err, doc) => {
    if (err) return err;
    const email = req.user.email;
    doc.players.forEach((player) => {
      if (player.email === email) {
        isAlready = true;
      }
    });
    if (!isAlready) {
      doc.players.push({
        email,
        cards: "back",
        chipsAmount: 500,
        rank: 1
      });
      doc.save();
    }
  });
  if (isAlready) {
    res.status(401).send("Vous êtes déjà connecté !");
  } else {
    res.json(game);
  }
  // Ameliorer en chercher si l'email est déjà présent avec un find plutôt qu'un forEach
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

exports.getGame = async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game) {
    return res.status(400).end();
  }
  return res.json(game).status(200).end();
};
