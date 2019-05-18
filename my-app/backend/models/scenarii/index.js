'use strict';

const Sequelize = require('sequelize');

const Scenarii = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publicationDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
};


module.exports = Scenarii;
