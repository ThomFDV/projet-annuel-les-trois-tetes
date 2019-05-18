'use strict';

const User = require('../../models').User;

const getAll = async (req, res, next) => {
    const users = await User.findAll();

    if (users !== null) {
        res.status(200);
        return res.json(users);

    }
    res.status(404).end();
    return undefined;

};

module.exports = getAll;
