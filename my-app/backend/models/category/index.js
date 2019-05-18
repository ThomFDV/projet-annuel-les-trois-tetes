'use strict';

const Sequelize = require('sequelize');

const Category = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }

};


module.exports = Category;
