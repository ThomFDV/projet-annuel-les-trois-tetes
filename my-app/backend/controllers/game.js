"use strict";

const Game = require("../models/game");
const GameInstance = require("../models/gameInstance");
const PlayerIG = require("../models/playerIG");
const mongoose = require("mongoose");

let games = [];

let findGame = (id) => {
  for (let i = 0; i < games.length; i++) {
    if (games[i].id == id) {
      return i;
    }
  }
  return undefined;
};

let addPlayer = (id, player) => {
  const index = findGame(id);
  games[index].players.push(new PlayerIG(player, games[index].initialStack));
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
    // const game = new Game({
    //   _id: gameId,
    //   title,
    //   mode,
    //   buyIn,
    //   maxPlayer,
    //   players,
    //   cashPrice,
    //   initialStack,
    //   creator
    // });
    // await game.save();
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
      message: "Problème lors de la création de la partie"
    }).end();
  }
};

exports.getCollection = async (req, res) => {
  res.status(200).json(games).end();
};

exports.getGame = async (req, res) => {
  let id = req.params.id;
  const index = await findGame(id);
  const game = games[index];
  if (!game) {
    return res.status(400).end();
  }
  return res.json(game).status(200).end();
};

exports.join = async (req, res, next) => {
  const id = req.params.id;
  const email = req.user.email;
  let isAlready = false;
  const index = findGame(id);
  await games[index].players.forEach((player) => {
    if (player.email === email) {
      isAlready = true;
    }
  });
  if (!isAlready) {
    const player = {
      email
    };
    addPlayer(id, player);
    res.status(200).json(games[index]).end();
  } else {
    res.status(401).send("Vous êtes déjà connecté !");
  }
};

exports.leave = async (req, res) => {
  const id = req.params.id;
  const index = findGame(id);
  const email = req.user.email;
  try {
    console.log(`\n${games[index].players}\n`);
    await games[index].players.forEach((player, i) => {
      if (player.email === email) {
        console.log(`\n${games[index].players[i]}\n${i}`);
        games[index].players.slice(i,1);
        console.log(`\n${games[index].players}\n`);
      }
    });
    return res.status(200).json(games[index].players).end();
  } catch (e) {
    return res.sendStatus(400).end();
  }
  // const game = await Game.updateOne({
  //   _id: req.params.id
  // }, {
  //   $pull: {
  //     players: {
  //       email: req.user.email
  //     }
  //   }
  // }, (err) => {
  //   if (err) {
  //     return res.sendStatus(400);
  //   }
  // });
  // res.sendStatus(200).end();
};
