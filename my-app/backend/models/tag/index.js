'use strict';

const Sequelize = require('sequelize');

const Tag = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

module.exports = Tag;
