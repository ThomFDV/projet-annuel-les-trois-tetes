const article = require('./article');
const auth = require('./auth');
const tag = require('./tag');
const user = require('./user');

const controllers = {
    article,
    auth,
    tag,
    user
};

module.exports = controllers;
