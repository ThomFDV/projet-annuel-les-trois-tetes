'use strict';

const Sequelize = require('sequelize');

const Media = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    }
};


module.exports = Media;
