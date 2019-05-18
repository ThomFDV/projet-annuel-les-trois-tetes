'use strict';

const Sequelize = require('sequelize');

const User = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'emailIndex'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stack: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    birthdate: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: "user"
    },
    token: {
        type: Sequelize.STRING,

    }
};

module.exports = User;
