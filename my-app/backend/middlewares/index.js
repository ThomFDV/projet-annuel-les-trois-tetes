const isAuthenticated = require('./isAuthenticated');
const isAdmin = require('./isAdmin');

const middlewares = {
    isAuthenticated,
    isAdmin
};

module.exports = middlewares;
