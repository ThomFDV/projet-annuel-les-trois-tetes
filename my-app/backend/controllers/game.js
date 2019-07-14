"use strict";

const Game = require("../models/game");
const GameInstance = require("../models/gameInstance");
const Player = require("../models/playerIG");
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
    games[index].players.push(new Player.PlayerIG(player, games[index].initialStack));
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
    if (!games) res.status(200).send("No games yet").end();
    res.status(200).json(games).end();
};

exports.play = async (req, res) => {
    const id = req.params.id;
    let game = games[findGame(id)];
    if (!game) return res.status(400).send("La partie n'a pas été trouvé").end();
    game.startGame();
    return res.status(200).json(game).end();
};

exports.bet = async (req, res) => {
    const value = req.body.value;
    const id = req.params.id;
    let game = games[findGame(id)];
    if (!game) {
        return res.status(400).send("La partie n'a pas été trouvé").end();
    } else if (req.user.email !== game.activePlayer.email) {
        return res.status(403).send("Ce n'est pas à vous de jouer").end();
    }
    let code = game.bet(value);
    switch (code) {
        case -1:
            return res.status(403).send(`C'est trop faible voyons ! Tu peux relancé d'au minimum une big bling qui est de` +
                `${game.bigBlind} ! Ou tu peux miser ${game.lastBet}`).end();
        case 1:
            return res.status(403).send("Vous emballez pas, misez moins ! Au moins jusqu'au montant de votre tapis").end();
        case -2:
            return res.status(403).send(`Impossible de miser en dessous de 0 !`).end();
        case 0:
            game.nextActivePlayer();
            return res.status(200).json(game).end();
    }
};

exports.fold = async (req, res) => {
    const id = req.params.id;
    let game = games[findGame(id)];
    if (!game) {
        return res.status(400).send("La partie n'a pas été trouvé").end();
    } else if (req.user.email !== game.activePlayer.email) {
        return res.status(403).send("Ce n'est pas à vous de jouer").end();
    }
    game.fold();
    return res.status(200).json(game).end();
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
        await _.remove(games[index].players, p => p.email === email);
        return res.status(200).json(games[index].players).end();
    } catch (e) {
        return res.sendStatus(400).end();
    }
};

exports.removeGame = async (req, res) => {

    const gameId = req.params.id;

    try {
        await _.remove(games, g => g.id === gameId);
        return res.status(200).json({"message": `Le game ${gameId} a bien été supprimée`}).end();
    } catch (e) {
        return res.sendStatus(409).end();
    }
};
