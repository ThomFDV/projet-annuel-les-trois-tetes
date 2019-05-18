'use strict';

const Sequelize = require('sequelize');

const Game = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    buyIn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nbMaxPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    playedDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    gamescol: {
        type: Sequelize.STRING,
        allowNull: false
    }
};


module.exports = Game;
