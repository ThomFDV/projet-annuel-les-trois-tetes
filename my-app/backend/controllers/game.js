"use strict";

const Game = require("../models/game");

exports.create = async (req, res, next) => {

  const title = req.body.title;
  const mode = req.body.mode;
  const buyIn = req.body.buyIn;
  const maxPlayer = req.body.maxPlayer;
  const currentPlayerNbr = req.body.currentPlayerNbr;
  const cashPrice = req.body.cashPrice;
  const creator = req.user.email;

  try {
    const game = new Game({
      title,
      mode,
      buyIn,
      maxPlayer,
      currentPlayerNbr,
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
