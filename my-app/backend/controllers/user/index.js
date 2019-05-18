const create = require('./create');
const remove = require('./remove');
const getOne = require('./getOne');
const getAll = require('./getAll');
const update = require('./update');

const controller = {
    create,
    remove,
    getOne,
    getAll,
    update
};

module.exports = controller;
