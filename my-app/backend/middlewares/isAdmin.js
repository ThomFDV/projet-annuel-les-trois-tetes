const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models').User;

const isAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.sendStatus(401);
    }

    next();
};

module.exports = isAdmin;
